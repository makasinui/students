<template>
    <v-table theme="dark">
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
                    {{ student.isActive }}
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../store';

const store = useStore();

const students = computed(() => store.getStudents);
</script>