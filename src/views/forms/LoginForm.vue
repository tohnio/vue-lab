<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const schema = toTypedSchema(
  z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
  })
)

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="space-y-4">
      <BaseInput
        id="login-email"
        label="Email Address"
        type="email"
        v-model="email"
        v-bind="emailAttrs"
        :error="errors.email"
        placeholder="you@example.com"
      />

      <BaseInput
        id="login-password"
        label="Password"
        type="password"
        v-model="password"
        v-bind="passwordAttrs"
        :error="errors.password"
        placeholder="••••••••"
      />
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
      </div>

      <div class="text-sm">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
      </div>
    </div>

    <BaseButton type="submit" block :loading="isSubmitting">
      Sign in
    </BaseButton>
  </form>
</template>
