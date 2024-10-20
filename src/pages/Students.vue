<template>
    <div class="flex justify-end gap-4">
        <router-link class="mb-2 flex justify-end" to="/sections">
            <v-btn>Секции</v-btn>
        </router-link>
        <router-link class="mb-2 flex justify-end" to="/student">
            <v-btn>Создать</v-btn>
        </router-link>
    </div>
    <Table 
        :page="page" 
        :perPage="perPage" 
        :lastPage="lastPage"
        :rows="students" 
        :columns="columns"
        @updatePage="(e) => page = e"
        @updatePerPage="(e) => perPage = e"
        @search="(e) => search = e"
        @sort="(e) => sort = e"
        @edit="(e) => edit(e)"
        @delete="(e) => deleteItem(e)"
    >
        <template #sections="{value}">
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
import { Sort, Student } from '../types';
import { useRouter } from 'vue-router';

const store = useStore();
const route = useRouter();

const page = ref(1);
const perPage = ref(10);
const lastPage = ref(1);
const students = ref<Student[]>([]);

const search = ref();
const sort = ref<Sort>();

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
        key: 'sections',
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
    const {
        data, 
        total
    } = store.getPaginatedStudents
    (
        page.value, 
        perPage.value, 
        search.value, 
        sort.value
    );

    students.value = data
    console.log(data)
    lastPage.value = total;
}

const deleteItem = (id: number) => {
    store.deleteStudent(id);
    fetch()
}

onMounted(() => {
    fetch()
})

watch([page, perPage, search, sort], () => {
    fetch()
})
</script>