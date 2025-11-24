<script setup lang="ts">
import TodoList from '../components/features/TodoList.vue'
import CalendarWidget from '../components/features/CalendarWidget.vue'
import DataTable from '../components/features/DataTable.vue'
import ChartWidget from '../components/features/ChartWidget.vue'
</script>

<template>
  <div class="space-y-8">
    <div class="text-center max-w-2xl mx-auto mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
        Feature Showcase
      </h1>
      <p class="text-lg text-gray-600">
        Explore our collection of fully functional, interactive components built with Vue 3 and Tailwind CSS.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Todo List -->
      <div class="h-[500px]">
        <TodoList />
      </div>

      <!-- Calendar -->
      <div class="h-[500px]">
        <CalendarWidget />
      </div>

      <!-- Charts -->
      <div class="h-[500px] lg:col-span-2">
        <ChartWidget />
      </div>

      <!-- Data Table -->
      <div class="h-[600px] lg:col-span-2">
        <DataTable />
      </div>
    </div>
  </div>
</template>
