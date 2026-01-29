<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

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

const responsiveMenu = ref([
  ...items.value,
  {
    label: 'Iniciar sesión',
    to: '/login',
    active: route.path.startsWith('/login')
  }
])
</script>

<template>
  <UHeader>
    <template #title>
      <IconsNuxtui class="h-6 w-auto" />
    </template>

    <UNavigationMenu :items="responsiveMenu" />

    <template #right>
      <UColorModeButton />
      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton color="neutral" variant="ghost" to="https://github.com/nuxt/ui" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
      <UButton color="primary" variant="solid" icon="i-heroicons-user-circle" to="/login" label="Login" />
    </template>
  </UHeader>
</template>
