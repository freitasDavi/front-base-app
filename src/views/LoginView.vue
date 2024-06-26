<script setup lang="ts">
import Card from "primevue/card"
import Button from "primevue/button";
import InputText from "primevue/inputtext"
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { unAuthApi } from "@/lib/api/api";
import type { TokenResponse } from "@/lib/api/responses/TokenResponse";

import { useToast } from "primevue/usetoast"
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { setCookie } from "@/lib/cookies";

const toast = useToast()
const router = useRouter()
const { setToken } = useUserStore()

const validationSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
)

const { handleSubmit, errors, defineField } = useForm({
    validationSchema
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
    const response = await unAuthApi<TokenResponse>("Auth/login", {
        method: "POST",
        body: {
            email: values.email,
            password: values.password
        }
    })

    setToken(response.msg)
    setCookie("@tkn-auth", response.msg)
    toast.add({
        severity: "success",
        summary: "Sucesso",
        detail: "Login realizado com sucesso",
        life: 2000,
    })

    setTimeout(() => {
        router.push("/")
    }, 2300);
})

</script>

<template>
    <main class="bg-blue-200 w-screen h-screen flex items-center justify-center">
        <Card class="min-w-[650px]">
            <template #title>Login</template>
            <template #content>
                <form class="space-y-4" @submit.prevent="onSubmit">
                    <div class="flex flex-col gap-2">
                        <label for="username">Nome de usuário</label>
                        <InputText v-model="email" id="username" :invalid="!!errors.email" />
                        <small id="username-help" class="p-error">
                            {{ errors.email }}
                        </small>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="password">Senha</label>
                        <InputText v-model="password" id="password" type="password" :invalid="!!errors.password" />
                        <small id="password-help" class="p-invalid">
                            {{ errors.password }}
                        </small>
                    </div>

                    <Button label="Login" type="submit" />
                </form>
            </template>
        </Card>
    </main>
</template>