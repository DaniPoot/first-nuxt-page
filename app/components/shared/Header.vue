<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { isLoggedIn, logout, isAdmin } = useAuthentication()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Productos',
    to: '/products',
    active: route.path.startsWith('/productos')
  },
  {
    label: 'Pricing',
    to: '/pricing',
    active: route.path.startsWith('/pricing')
  },
  {
    label: 'Nosotros',
    to: '/about',
    active: route.path.startsWith('/about')
  },
  {
    label: 'Contacto',
    to: '/contact',
  }
])

</script>

<template>
  <UHeader>
    <template #title>
      <IconsNuxtui class="h-6 w-auto" />
    </template>

    <UNavigationMenu :items="items" />
    <ClientOnly>
      <UNavigationMenu v-if="isAdmin" :items="[{
        label: 'Dashboard',
        to: '/dashboard'
      }]" />
    </ClientOnly>

    <template #right>
      <UColorModeButton />
      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton color="neutral" variant="ghost" to="https://github.com/nuxt/ui" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
      <ClientOnly>
        <UButton v-if="!isLoggedIn" color="primary" variant="solid" icon="i-heroicons-user-circle" to="/login"
          label="Login" />
        <UButton v-else color="primary" variant="ghost" icon="i-heroicons-user-circle" label="Cerrar sesión"
          @click="logout" />
      </ClientOnly>
    </template>
  </UHeader>
</template>
