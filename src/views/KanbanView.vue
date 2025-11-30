<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Card {
  id: number
  title: string
  description: string
  tags: string[]
}

interface Column {
  id: string
  title: string
  cards: Card[]
}

const columns = ref<Column[]>([
  {
    id: 'todo',
    title: 'A Fazer',
    cards: [
      { id: 1, title: 'Pesquisar concorrentes', description: 'Analisar features dos apps similares', tags: ['Pesquisa'] },
      { id: 2, title: 'Criar wireframes', description: 'Desenhar telas iniciais no Figma', tags: ['Design'] }
    ]
  },
  {
    id: 'in-progress',
    title: 'Em Andamento',
    cards: [
      { id: 3, title: 'Configurar projeto Vue', description: 'Setup inicial com Vite e Tailwind', tags: ['Dev'] }
    ]
  },
  {
    id: 'done',
    title: 'Concluído',
    cards: [
      { id: 4, title: 'Definir paleta de cores', description: 'Escolher cores primárias e secundárias', tags: ['Design'] }
    ]
  }
])

const draggedCard = ref<{ card: Card, sourceColumnId: string } | null>(null)

const onDragStart = (event: DragEvent, card: Card, columnId: string) => {
  draggedCard.value = { card, sourceColumnId: columnId }
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', JSON.stringify(card))
    // Optional: set drag image
  }
}

const onDrop = (event: DragEvent, targetColumnId: string) => {
  if (!draggedCard.value) return

  const { card, sourceColumnId } = draggedCard.value

  if (sourceColumnId === targetColumnId) {
    draggedCard.value = null
    return
  }

  // Remove from source
  const sourceColumn = columns.value.find(c => c.id === sourceColumnId)
  if (sourceColumn) {
    sourceColumn.cards = sourceColumn.cards.filter(c => c.id !== card.id)
  }

  // Add to target
  const targetColumn = columns.value.find(c => c.id === targetColumnId)
  if (targetColumn) {
    targetColumn.cards.push(card)
  }

  draggedCard.value = null
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault() // Necessary to allow dropping
}

// Modal State
const isModalOpen = ref(false)
const activeColumnId = ref<string | null>(null)
const newCardForm = ref({
  title: '',
  description: '',
  tags: ''
})
const titleInput = ref<HTMLInputElement | null>(null)

const openAddCardModal = (columnId: string) => {
  activeColumnId.value = columnId
  newCardForm.value = { title: '', description: '', tags: '' }
  isModalOpen.value = true
  nextTick(() => {
    titleInput.value?.focus()
  })
}

const closeAddCardModal = () => {
  isModalOpen.value = false
  activeColumnId.value = null
}

const addCard = () => {
  if (!activeColumnId.value || !newCardForm.value.title.trim()) return

  const targetColumn = columns.value.find(c => c.id === activeColumnId.value)
  if (targetColumn) {
    const newId = Math.max(0, ...columns.value.flatMap(c => c.cards).map(c => c.id)) + 1
    
    const tags = newCardForm.value.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)

    targetColumn.cards.push({
      id: newId,
      title: newCardForm.value.title,
      description: newCardForm.value.description,
      tags: tags.length > 0 ? tags : ['Geral']
    })
  }

  closeAddCardModal()
}
</script>

<template>
  <div>
    <div class="min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mb-2">
            Kanban Board
          </h1>
          <p class="text-gray-600">Gerencie suas tarefas com estilo e eficiência.</p>
        </div>

        <div class="flex gap-6 overflow-x-auto pb-4">
          <div
            v-for="column in columns"
            :key="column.id"
            class="flex-shrink-0 w-80 bg-gray-100/50 backdrop-blur-sm rounded-xl border border-gray-200/60 p-4 flex flex-col gap-4 transition-colors duration-300"
            :class="{ 'bg-indigo-50/50 border-indigo-200': draggedCard && draggedCard.sourceColumnId !== column.id }"
            @dragover="onDragOver"
            @drop="onDrop($event, column.id)"
          >
            <div class="flex items-center justify-between mb-2">
              <h2 class="font-bold text-gray-700 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" 
                  :class="{
                    'bg-red-400': column.id === 'todo',
                    'bg-yellow-400': column.id === 'in-progress',
                    'bg-green-400': column.id === 'done'
                  }"
                ></span>
                {{ column.title }}
              </h2>
              <span class="text-xs font-medium text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                {{ column.cards.length }}
              </span>
            </div>

            <div class="flex flex-col gap-3 min-h-[150px]">
              <div
                v-for="card in column.cards"
                :key="card.id"
                class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 group relative overflow-hidden"
                draggable="true"
                @dragstart="onDragStart($event, card, column.id)"
              >
                <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div class="flex flex-wrap gap-2 mb-2">
                  <span 
                    v-for="tag in card.tags" 
                    :key="tag"
                    class="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <h3 class="font-semibold text-gray-800 mb-1 group-hover:text-indigo-700 transition-colors">{{ card.title }}</h3>
                <p class="text-sm text-gray-500 line-clamp-2">{{ card.description }}</p>
              </div>
              
              <button 
                @click="openAddCardModal(column.id)"
                class="mt-auto py-2 px-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 group"
              >
                <span class="text-xl leading-none group-hover:scale-110 transition-transform">+</span> Adicionar Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Adicionar Card -->
    <!-- Modal Adicionar Card -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="closeAddCardModal">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Novo Card</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input 
                  ref="titleInput"
                  v-model="newCardForm.title"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Ex: Criar API"
                  @keyup.enter="addCard"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  v-model="newCardForm.description"
                  rows="3" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Detalhes da tarefa..."
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tags (separadas por vírgula)</label>
                <input 
                  v-model="newCardForm.tags"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Ex: Dev, Backend, Urgente"
                  @keyup.enter="addCard"
                >
              </div>
            </div>
            
            <div class="mt-6 flex justify-end gap-3">
              <button 
                @click="closeAddCardModal"
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                @click="addCard"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
