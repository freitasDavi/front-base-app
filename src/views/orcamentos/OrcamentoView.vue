<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import Column from 'primevue/column';
import { onMounted, ref } from 'vue';
import { api } from '@/lib/api/api';
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Orcamento } from "@/modules/Orcamento/Orcamento"

const orcamentos = ref<Orcamento[]>([])

onMounted(async () => {
    await onClickFetchOrcamentos()
})

const onClickFetchOrcamentos = async () => {
    const response = await api<Orcamento[]>("/Orcamentos")

    orcamentos.value = response
}

const onClickEditar = (orc: Orcamento) => {
    console.log(orc)
}

const onClickNovo = () => {
    console.log("novo")
}

</script>

<template>
    <section class="p-10">
        <section id="filters" class="my-10">
            <h2 class="text-2xl font-bold">Orçamentos</h2>
        </section>

        <Button label="Novo" class="mb-4" @click="onClickNovo" />

        <DataTable :value="orcamentos" tableStyle="min-width: 50rem">
            <Column field="id" header="Código"></Column>
            <Column field="descricao" header="Descrição"></Column>
            <Column field="descricao" header="Descrição">
                <template #body="slotProps">
                    {{ format(new Date(slotProps.data.validade), "MM/dd/yyyy", { locale: ptBR }) }}
                </template>
            </Column>
            <Column field="valorTotal" header="Total"></Column>
            <Column field="actions" header="Ações">
                <template #body="slotProps">
                    <Button icon="pi pi-search" @click="onClickEditar(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </section>
</template>