<template>
    <router-link class="mb-2 flex justify-end" to="/student">
        <v-btn>Создать</v-btn>
    </router-link>
    <Table 
        :page="page" 
        :perPage="perPage" 
        :lastPage="lastPage"
        :rows="students" 
        :columns="columns"
        @updatePage="(e) => page = e"
        @updatePerPage="(e) => perPage = e"
        @edit="(e) => edit(e)"
    >
        <template #sectionItems="{value}">
            <div v-for="section in value">
                {{ section.name }}
            </div>
        </template>
    </Table>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useStore } from '../store';
import Table from '../components/Table.vue';
import { Student } from '../types';
import { useRouter } from 'vue-router';

const store = useStore();
const route = useRouter();

const page = ref(1);
const perPage = ref(10);
const lastPage = ref(1);
const students = ref<Student[]>([]);

const columns = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'fullName',
        name: 'ФИО'
    },
    {
        key: 'dateOfBirth',
        name: 'Дата рождения'
    },
    {
        key: 'sectionItems',
        name: 'Секции'
    },
    {
        key: 'photoUrl',
        name: 'Фото'
    },
    {
        key: 'isActive',
        name: 'Активность'
    }
];
const edit = (id: number) => {
    route.push('/student/' + id)
}

const fetch = () => {
    const {data, total} = store.getPaginatedStudents(page.value, perPage.value);

    students.value = data
    lastPage.value = total;
}

onMounted(() => {
    fetch()
})

watch([page, perPage], () => {
    fetch()
})
</script>