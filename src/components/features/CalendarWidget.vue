<script setup lang="ts">
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const selectedDate = ref(new Date())

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonth = computed(() => monthNames[currentDate.value.getMonth()])
const currentYear = computed(() => currentDate.value.getFullYear())

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month, 1).getDay()
})

const calendarDays = computed(() => {
  const days = []
  const prevMonthDays = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 0).getDate()
  
  // Previous month days
  for (let i = firstDayOfMonth.value - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      type: 'prev',
      date: new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, prevMonthDays - i)
    })
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push({
      day: i,
      type: 'current',
      date: new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), i)
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      type: 'next',
      date: new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, i)
    })
  }
  
  return days
})

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}

const isSelected = (date: Date) => {
  return date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  // If clicking a date from another month, switch to that month
  if (date.getMonth() !== currentDate.value.getMonth()) {
    currentDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
  }
}

// Dummy events
const events = [
  { date: new Date().getDate() + 2, title: 'Meeting', color: 'bg-blue-500' },
  { date: new Date().getDate() + 5, title: 'Review', color: 'bg-green-500' },
  { date: new Date().getDate() - 3, title: 'Launch', color: 'bg-purple-500' },
]

const getEventsForDay = (date: Date) => {
  // Only show events for current month to simplify dummy logic
  if (date.getMonth() !== new Date().getMonth()) return []
  return events.filter(e => e.date === date.getDate())
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ currentMonth }} {{ currentYear }}</h3>
        <p class="text-sm text-gray-500">Events and schedules</p>
      </div>
      <div class="flex gap-1">
        <button 
          @click="prevMonth"
          class="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          @click="nextMonth"
          class="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <div class="p-4 flex-1 flex flex-col">
      <div class="grid grid-cols-7 mb-2">
        <div 
          v-for="day in daysOfWeek" 
          :key="day"
          class="text-center text-xs font-semibold text-gray-400 py-2"
        >
          {{ day }}
        </div>
      </div>
      
      <div class="grid grid-cols-7 flex-1 gap-1">
        <button
          v-for="(dateObj, index) in calendarDays"
          :key="index"
          @click="selectDate(dateObj.date)"
          class="relative p-2 rounded-lg flex flex-col items-center justify-start min-h-[3rem] transition-all border border-transparent"
          :class="[
            dateObj.type === 'current' ? 'text-gray-900' : 'text-gray-400 bg-gray-50/50',
            isSelected(dateObj.date) ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'hover:bg-gray-50',
            isToday(dateObj.date) && !isSelected(dateObj.date) ? 'bg-gray-50 font-semibold' : ''
          ]"
        >
          <span 
            class="text-sm w-7 h-7 flex items-center justify-center rounded-full mb-1"
            :class="isToday(dateObj.date) ? 'bg-indigo-600 text-white font-bold' : ''"
          >
            {{ dateObj.day }}
          </span>
          
          <div class="flex gap-1 w-full justify-center">
            <div 
              v-for="(event, i) in getEventsForDay(dateObj.date)" 
              :key="i"
              class="w-1.5 h-1.5 rounded-full"
              :class="event.color"
            ></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
