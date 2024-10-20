<template>
    <router-link class="mb-2 flex justify-end" to="/section">
        <v-btn class="w-full">Создать</v-btn>
    </router-link>
    <Table 
        :page="page" 
        :perPage="perPage" 
        :lastPage="lastPage"
        :rows="sections" 
        :columns="columns"
        @updatePage="(e) => page = e"
        @updatePerPage="(e) => perPage = e"
        @search="(e) => search = e"
        @sort="(e) => sort = e"
        @edit="(e) => edit(e)"
        @delete="(e) => deleteItem(e)"
    >
        <template #students="{value}">
            <div v-for="student in value">
                {{ student.head.fullName }}
            </div>
        </template>
    </Table>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useStore } from '../store';
import Table from '../components/Table.vue';
import { Sort, Section } from '../types';
import { useRouter } from 'vue-router';

const store = useStore();
const route = useRouter();

const page = ref(1);
const perPage = ref(10);
const lastPage = ref(1);
const sections = ref<Section[]>([]);

const search = ref();
const sort = ref<Sort>();

const columns = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'name',
        name: 'Название'
    },
    {
        key: 'students',
        name: 'Студенты'
    },
    
];
const edit = (id: number) => {
    route.push('/section/' + id)
}

const fetch = () => {
    const {
        data, 
        total
    } = store.getPaginatedSections
    (
        page.value, 
        perPage.value, 
        search.value, 
        sort.value
    );

    sections.value = data
    console.log(data)
    lastPage.value = total;
}

const deleteItem = (id: number) => {
    store.deleteSection(id);
    fetch()
}

onMounted(() => {
    fetch()
})

watch([page, perPage, search, sort], () => {
    fetch()
})
</script>