<template>
    <v-table>
        <thead>
            <tr>
                <th>
                   ФИО 
                </th>
                <th>
                    Дата рождения
                </th>
                <th>
                    Секции
                </th>
                <th>
                    Фото
                </th>
                <th>
                    Активность
                </th>
                <th>
                    Действия
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="student in students" :key="student.id">
                <td>
                    {{ student.fullName }}
                </td>
                <td>
                    {{ student.dateOfBirth }}
                </td>
                <td>
                    <div v-for="section in student.sectionItems" :key="section.id">
                        {{ section.name }}
                    </div>
                </td>
                <td>
                    {{ student.photoUrl }}
                </td>
                <td>
                    {{ student.isActive ? "Да" : "Нет" }}
                </td>
                <td>
                    
                </td>
            </tr>
        </tbody>
    </v-table>
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
import { Student } from '../types';

const store = useStore();
const page = ref(1);
const perPage = ref(10);
const lastPage = ref(1);
const students = ref<Student[]>([]);

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