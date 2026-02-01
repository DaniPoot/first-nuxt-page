<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  layout: 'login-layout',
  middleware: ['not-authenticated']
})

const toast = useToast()
const cookieLoginEmail = useCookie<string | null>('login_email', {
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 30 // 30 días
})

const { login } = useAuthentication()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
    defaultValue: cookieLoginEmail.value ?? ''
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true
  }, {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',
    defaultValue: Boolean(cookieLoginEmail.value)
  }]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: 'Login with Google' })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: 'Login with GitHub' })
  }
}]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  remember: z.boolean().optional()
})

type Schema = z.output<typeof schema>

const isPosting = ref(false)

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { email, password, remember } = payload.data
  isPosting.value = true

  if (remember) {
    cookieLoginEmail.value = email
  } else {
    cookieLoginEmail.value = null
  }
  const isSuccessful = await login(email, password)
  if (!isSuccessful) {
    toast.add({
      title: 'Login failed',
      description: 'Revisar las credenciales'
    })
  }
  isPosting.value = false
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema="schema" title="Login" description="Enter your credentials to access your account."
        icon="i-lucide-user" :fields="fields" :providers="providers" @submit="onSubmit" />
    </UPageCard>
    <UButton color="primary" variant="ghost" label="No tienes cuenta? Registrate" to="/register" />
  </div>
</template>