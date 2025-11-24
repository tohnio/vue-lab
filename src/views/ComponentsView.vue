<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const inputValue = ref('')
</script>

<template>
  <div class="space-y-12">
    <div class="text-center max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Design System</h1>
      <p class="text-lg text-gray-600">
        A collection of reusable components designed for consistency and elegance.
      </p>
    </div>

    <!-- Buttons Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-gray-900 border-b pb-2">Buttons</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BaseCard>
          <template #header>
            <h3 class="font-medium text-gray-900">Variants</h3>
          </template>
          <div class="flex flex-wrap gap-4">
            <BaseButton variant="primary">Primary</BaseButton>
            <BaseButton variant="secondary">Secondary</BaseButton>
            <BaseButton variant="outline">Outline</BaseButton>
            <BaseButton variant="ghost">Ghost</BaseButton>
            <BaseButton variant="danger">Danger</BaseButton>
          </div>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-medium text-gray-900">Sizes & States</h3>
          </template>
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <BaseButton size="sm">Small</BaseButton>
            <BaseButton size="md">Medium</BaseButton>
            <BaseButton size="lg">Large</BaseButton>
          </div>
          <div class="flex flex-wrap gap-4">
            <BaseButton loading>Loading</BaseButton>
            <BaseButton disabled>Disabled</BaseButton>
          </div>
        </BaseCard>
      </div>
    </section>

    <!-- Cards Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-gray-900 border-b pb-2">Cards</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BaseCard>
          <div class="space-y-2">
            <h4 class="font-medium text-gray-900">Simple Card</h4>
            <p class="text-gray-600 text-sm">Just a simple card with some content inside it. Perfect for grouping related information.</p>
          </div>
        </BaseCard>

        <BaseCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h4 class="font-medium text-gray-900">Card with Header</h4>
              <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">New</span>
            </div>
          </template>
          <p class="text-gray-600 text-sm">This card has a dedicated header slot for titles or actions.</p>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h4 class="font-medium text-gray-900">Full Featured</h4>
          </template>
          <p class="text-gray-600 text-sm mb-4">This card utilizes header, default, and footer slots.</p>
          <template #footer>
            <div class="flex justify-end">
              <BaseButton size="sm" variant="outline">Action</BaseButton>
            </div>
          </template>
        </BaseCard>
      </div>
    </section>

    <!-- Inputs Section -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-gray-900 border-b pb-2">Inputs</h2>
      
      <div class="max-w-xl">
        <BaseCard>
          <div class="space-y-4">
            <BaseInput 
              id="demo-input" 
              label="Standard Input" 
              placeholder="Type something..." 
              v-model="inputValue" 
            />
            
            <BaseInput 
              id="demo-input-error" 
              label="Input with Error" 
              placeholder="Invalid value" 
              model-value="Wrong input"
              error="This field has an error" 
            />

            <div class="pt-4 border-t">
              <p class="text-sm text-gray-600">Bound value: <span class="font-mono text-indigo-600">{{ inputValue }}</span></p>
            </div>
          </div>
        </BaseCard>
      </div>
    </section>
  </div>
</template>
