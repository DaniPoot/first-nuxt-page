<script setup lang="ts">
</script>

<template>
  <UCard class="w-full" :ui="{ body: 'px-20' }">
    <USkeleton as="img" class="w-full h-52" />

    <div class="mt-4">
      <USkeleton as="h3" class="h-7 w-full" />
      <USkeleton as="p" class="h-14 w-full mt-1" />
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <USkeleton as="p" class="h-5 w-12" />
        <USkeleton as="button" class="h-5 w-20" />
      </div>
    </template>
  </UCard>
</template>