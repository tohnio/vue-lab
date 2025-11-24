<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const schema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters')
  })
)

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [subject, subjectAttrs] = defineField('subject')
const [message, messageAttrs] = defineField('message')

const onSubmit = handleSubmit(async (values) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput
          id="contact-name"
          label="Name"
          v-model="name"
          v-bind="nameAttrs"
          :error="errors.name"
          placeholder="John Doe"
        />

        <BaseInput
          id="contact-email"
          label="Email"
          type="email"
          v-model="email"
          v-bind="emailAttrs"
          :error="errors.email"
          placeholder="you@example.com"
        />
      </div>

      <BaseInput
        id="contact-subject"
        label="Subject"
        v-model="subject"
        v-bind="subjectAttrs"
        :error="errors.subject"
        placeholder="How can we help?"
      />

      <div class="space-y-1">
        <label for="contact-message" class="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="contact-message"
          v-model="message"
          v-bind="messageAttrs"
          rows="4"
          class="block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border transition-colors duration-200"
          :class="[errors.message ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : '']"
          placeholder="Tell us more about your inquiry..."
        ></textarea>
        <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
      </div>
    </div>

    <BaseButton type="submit" block :loading="isSubmitting">
      Send Message
    </BaseButton>
  </form>
</template>
