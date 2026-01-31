<script lang="ts" setup>

const props = defineProps<{ slug: string }>()

const { data: productSuggestions, status } = useLazyFetch(`/api/product/${props.slug}/suggestions`)
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" v-if="status === 'pending'">
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
  </div>
  <ProductsGrid hydrate-on-visible :products="productSuggestions || []" v-else />
</template>