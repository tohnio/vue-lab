<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([
  { id: 1, text: 'Learn Vue 3', completed: true },
  { id: 2, text: 'Build a cool app', completed: false },
  { id: 3, text: 'Master Composition API', completed: false },
])

const newTodo = ref('')
const filter = ref<'all' | 'active' | 'completed'>('all')

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.completed)
  if (filter.value === 'completed') return todos.value.filter(t => t.completed)
  return todos.value
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
    <div class="p-6 border-b border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">Todo List</h3>
      <p class="text-sm text-gray-500">Manage your daily tasks</p>
    </div>

    <div class="p-6 flex-1 flex flex-col">
      <div class="flex gap-2 mb-6">
        <input 
          v-model="newTodo"
          @keyup.enter="addTodo"
          type="text" 
          placeholder="Add a new task..." 
          class="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        >
        <button 
          @click="addTodo"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Add
        </button>
      </div>

      <div class="flex gap-2 mb-4">
        <button 
          v-for="f in ['all', 'active', 'completed']" 
          :key="f"
          @click="filter = f as any"
          class="px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors"
          :class="filter === f ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          {{ f }}
        </button>
      </div>

      <div class="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
        <div 
          v-for="todo in filteredTodos" 
          :key="todo.id"
          class="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
        >
          <button 
            @click="toggleTodo(todo.id)"
            class="flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors"
            :class="todo.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 hover:border-indigo-500'"
          >
            <svg v-if="todo.completed" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </button>
          
          <span 
            class="flex-1 text-sm transition-all duration-200"
            :class="todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'"
          >
            {{ todo.text }}
          </span>

          <button 
            @click="deleteTodo(todo.id)"
            class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <div v-if="filteredTodos.length === 0" class="text-center py-8 text-gray-400 text-sm">
          No tasks found
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}
</style>
