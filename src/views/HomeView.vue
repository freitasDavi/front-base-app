<script setup lang="ts">
import { api } from '@/lib/api/api';
import { onMounted } from 'vue';


onMounted(async () => {
  const res = await api("Orcamentos");

  console.log(res)
})

</script>

<template>
  <main>
    ola
  </main>
</template>
