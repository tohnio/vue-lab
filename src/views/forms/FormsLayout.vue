<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Authentication & Forms</h1>
      <p class="text-gray-600 mt-2">Examples of complex form handling with validation.</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px">
          <router-link 
            to="/forms/login" 
            class="w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[route.path === '/forms/login' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            Login
          </router-link>
          <router-link 
            to="/forms/register" 
            class="w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[route.path === '/forms/register' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            Register
          </router-link>
          <router-link 
            to="/forms/contact" 
            class="w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors duration-200"
            :class="[route.path === '/forms/contact' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']"
          >
            Contact
          </router-link>
        </nav>
      </div>

      <div class="p-6 sm:p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
