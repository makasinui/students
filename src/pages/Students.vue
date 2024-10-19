<template>
    <Table :rows="students" :columns="columns">
        <template #sectionItems="{value}">
            <div v-for="section in value">
                {{ section.name }}
            </div>
        </template>
    </Table>
    <Pagination 
        :page="page"
        :per-page="perPage"
        :last-page="lastPage"
        @update-page="(e) => page = e"
        @update-per-page="(e) => perPage = e"
    />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useStore } from '../store';
import Pagination from '../components/Pagination.vue';
import Table from '../components/Table.vue';
import { Student } from '../types';

const store = useStore();
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