<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const schema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
)

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="space-y-4">
      <BaseInput
        id="register-name"
        label="Full Name"
        v-model="name"
        v-bind="nameAttrs"
        :error="errors.name"
        placeholder="John Doe"
      />

      <BaseInput
        id="register-email"
        label="Email Address"
        type="email"
        v-model="email"
        v-bind="emailAttrs"
        :error="errors.email"
        placeholder="you@example.com"
      />

      <BaseInput
        id="register-password"
        label="Password"
        type="password"
        v-model="password"
        v-bind="passwordAttrs"
        :error="errors.password"
        placeholder="••••••••"
      />

      <BaseInput
        id="register-confirm"
        label="Confirm Password"
        type="password"
        v-model="confirmPassword"
        v-bind="confirmPasswordAttrs"
        :error="errors.confirmPassword"
        placeholder="••••••••"
      />
    </div>

    <BaseButton type="submit" block :loading="isSubmitting">
      Create Account
    </BaseButton>
  </form>
</template>
