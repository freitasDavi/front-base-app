<script setup lang="ts">
import { api } from '@/lib/api/api';
import { useUserStore } from '@/stores/user';
import Button from 'primevue/button';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { deleteToken } = useUserStore()

onMounted(async () => {
  // const res = await api("Orcamentos");

  // console.log(res)
})

const onClickLogout = () => {
  deleteToken()
  router.push("/login")
}

</script>

<template>
  <main class="space-x-4">
    <Button label="Logout" severity="danger" @click="onClickLogout" />
    <Button label="Orçamentos" @click="$router.push('/orcamentos')" />
  </main>
</template>
