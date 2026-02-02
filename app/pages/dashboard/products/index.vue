<template>
  <div class="space-y-6">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Productos
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Gestiona y organiza tu catálogo de productos
        </p>
      </div>
      <UButton to="/dashboard/product/new" icon="i-lucide-plus" label="Agregar Producto" color="primary" size="lg" />
    </div>

    <UTable :data="products" :columns="columns" pa class="flex-1" ref="table" />
    <SharedPagination :total="total" :model-value="currentPage" :per-page="perPage" />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
const UBadge = resolveComponent('UBadge');
const UAvatar = resolveComponent('UAvatar')
const NuxtLink = resolveComponent('NuxtLink')

const { products, perPage, currentPage, total } = await usePaginatedProducts()

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'images',
    header: 'Imagen',
    cell: ({ row }) => {
      const images = row.getValue('images') as string[]
      const url = Array.isArray(images) && images.length > 0 ? images[0] : ''
      if (!url) return h('span', { class: 'text-gray-500' }, 'sin imagen')

      return h(UAvatar, { class: 'rounded-none', src: url },)
    }
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const productName = row.getValue('name')
      const productId = row.getValue('id')

      return h(NuxtLink, {
        to: `/dashboard/product/${productId}`,
        class: 'text-blue-500 hover:text-blue-700 underline cursor-pointer'
      }, () => productName)
    }
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => {
      return h('div', {
        style: 'white-space: normal; word-break: break-word; max-width: 400px',
        class: 'truncate-text'
      }, String(row.getValue('description')).slice(0, 50) + '...')
    }
  },
  {
    accessorKey: 'price',
    header: () => h('div', { class: 'text-right' }, 'Precio'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      }).format(amount);
      return h('div', { class: 'text-right font-medium' }, formatted);
    },
  },
  {
    accessorKey: 'tags',
    header: 'Etiquitas',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[]

      // return h('div', { class: 'flex gap-5' }, tags.map(tag => h(UBadge, { class: 'capitalize', variant: 'subtle', color: 'primary' }, () => tag)))
      return tags.map(tag => h(UBadge, { class: 'capitalize mx-1', variant: 'subtle', color: 'primary' }, () => tag))
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Creado',
    cell: ({ row }) => dayMonthYearFormath(new Date(row.getValue('createdAt')))
  }
];
</script>