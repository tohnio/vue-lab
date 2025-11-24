<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js'
import { Bar, Line, Doughnut } from 'vue-chartjs'
import { ref } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
)

const chartType = ref<'bar' | 'line' | 'doughnut'>('bar')

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      backgroundColor: '#4f46e5',
      borderColor: '#4f46e5',
      data: [40, 39, 10, 40, 39, 80, 40],
      tension: 0.4
    },
    {
      label: 'Expenses',
      backgroundColor: '#ef4444',
      borderColor: '#ef4444',
      data: [20, 25, 30, 22, 30, 40, 25],
      tension: 0.4
    }
  ]
}

const doughnutData = {
  labels: ['Direct', 'Social', 'Referral', 'Organic'],
  datasets: [
    {
      backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'],
      data: [40, 20, 80, 10]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    }
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">Analytics</h3>
        <p class="text-sm text-gray-500">Performance overview</p>
      </div>
      <div class="flex bg-gray-100 rounded-lg p-1">
        <button 
          v-for="type in ['bar', 'line', 'doughnut']" 
          :key="type"
          @click="chartType = type as any"
          class="px-3 py-1 rounded-md text-xs font-medium capitalize transition-all"
          :class="chartType === type ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div class="p-6 flex-1 min-h-[300px] relative">
      <Bar v-if="chartType === 'bar'" :data="data" :options="options" />
      <Line v-else-if="chartType === 'line'" :data="data" :options="options" />
      <div v-else class="h-full flex items-center justify-center">
        <div class="w-full max-w-[300px]">
          <Doughnut :data="doughnutData" :options="options" />
        </div>
      </div>
    </div>
  </div>
</template>
