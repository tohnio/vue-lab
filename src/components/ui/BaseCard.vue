<script setup lang="ts">
interface Props {
  noPadding?: boolean
}

withDefaults(defineProps<Props>(), {
  noPadding: false
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
      <slot name="header"></slot>
    </div>
    
    <div :class="[!noPadding && 'p-6']">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
