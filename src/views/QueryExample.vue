<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  return data
}

const { data: posts, isLoading, isError, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">TanStack Query Example</h1>
    
    <div v-if="isLoading" class="text-gray-600">Loading posts...</div>
    
    <div v-else-if="isError" class="text-red-500">
      Error: {{ error }}
    </div>
    
    <div v-else class="grid gap-4">
      <div v-for="post in posts" :key="post.id" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
        <p class="text-gray-600">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>
