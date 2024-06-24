<script setup lang="ts">
import Card from "primevue/card"
import Button from "primevue/button";
import InputText from "primevue/inputtext"
import { ref } from "vue"

const email = ref<string>("");
const password = ref<string>("");

const onSubmit = (e) => {
    e.preventDefault()
    console.log("tdste")
}

</script>

<template>
    <main class="bg-red-500 w-screen h-screen flex items-center justify-center">
        <Card class="min-w-[650px]">
            <template #title>Login</template>
            <template #content>
                <form class="space-y-4" @submit="onSubmit">
                    <div class="flex flex-col gap-2">
                        <label for="username">Nome de usuário</label>
                        <InputText v-model="email" id="username" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="password">Senha</label>
                        <InputText v-model="password" id="password" />
                    </div>

                    <Button label="Login" type="submit" />
                </form>
            </template>
        </Card>
    </main>
</template>