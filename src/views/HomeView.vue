<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router'

const counter = useCounterStore()
const router = useRouter()

const features = [
  {
    title: 'Modern Tooling',
    description: 'Built with Vite 4 and TypeScript 5 for a blazing fast development experience and type safety.',
    icon: '⚡'
  },
  {
    title: 'State Management',
    description: 'Powered by Pinia for intuitive, type-safe global state management.',
    icon: '🍍'
  },
  {
    title: 'Component Design',
    description: 'Reusable UI components (BaseButton, BaseCard, BaseInput) built with Tailwind CSS.',
    icon: '🎨'
  },
  {
    title: 'Form Validation',
    description: 'Robust form handling using VeeValidate and Zod schemas.',
    icon: '📝'
  },
  {
    title: 'Data Fetching',
    description: 'Server state management with TanStack Query (Vue Query).',
    icon: '📡'
  },
  {
    title: 'Routing',
    description: 'Vue Router 4 with nested routes and lazy loading.',
    icon: '🛣️'
  },
  {
    title: 'Feature Showcase',
    description: 'Full-featured examples including Todo List, Calendar, Data Table, and Charts.',
    icon: '🚀'
  }
]
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center space-y-4 py-8">
      <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
        Vue 3 Study Lab
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        A comprehensive showcase of modern Vue.js development practices, featuring the latest tools and libraries used in the market.
      </p>
      <div class="flex justify-center gap-4 pt-4">
        <BaseButton size="lg" @click="router.push('/components')">Explore Components</BaseButton>
        <BaseButton size="lg" variant="outline" @click="router.push('/forms')">Try Forms</BaseButton>
      </div>
    </section>

    <!-- Live Demo Section (Pinia) -->
    <section class="max-w-md mx-auto">
      <BaseCard>
        <template #header>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🍍</span>
            <h3 class="font-bold text-lg text-gray-900">Pinia State Demo</h3>
          </div>
        </template>
        <div class="text-center space-y-4">
          <div class="flex justify-center gap-8 text-lg">
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm uppercase tracking-wider">Count</span>
              <span class="font-mono font-bold text-3xl text-indigo-600">{{ counter.count }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-sm uppercase tracking-wider">Double</span>
              <span class="font-mono font-bold text-3xl text-violet-600">{{ counter.doubleCount }}</span>
            </div>
          </div>
          <BaseButton @click="counter.increment" block>
            Increment Counter
          </BaseButton>
        </div>
      </BaseCard>
    </section>

    <!-- Features Grid -->
    <section>
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Project Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BaseCard v-for="feature in features" :key="feature.title" class="h-full">
          <div class="flex flex-col h-full">
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 flex-grow">{{ feature.description }}</p>
          </div>
        </BaseCard>
      </div>
    </section>

    <!-- Quick Navigation -->
    <section class="bg-indigo-50 rounded-2xl p-8 md:p-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-2 text-center md:text-left">
          <h2 class="text-2xl font-bold text-indigo-900">Ready to dive deeper?</h2>
          <p class="text-indigo-700">Check out the API integration examples or browse the component library.</p>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <BaseButton variant="secondary" @click="router.push('/query')">API Examples</BaseButton>
          <BaseButton variant="secondary" @click="router.push('/components')">UI Components</BaseButton>
          <BaseButton variant="secondary" @click="router.push('/features')">Feature Showcase</BaseButton>
          <BaseButton variant="secondary" @click="router.push('/forms')">Form Validation</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>
