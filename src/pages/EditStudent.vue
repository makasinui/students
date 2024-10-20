<template>
    <router-link class="ml-3" to="/">
        <v-btn>Назад</v-btn>
    </router-link>
    <div v-if="!loading">
        <v-container>
            <h1>{{ formData.id ? 'Редактирование' : "Создание" }} студента</h1>
            <v-form @submit.prevent="update" v-model="valid" class="mt-4">
                <v-text-field append-icon="mdi-asterisk" :rules="[rules('required'), rules('min', 10)]" label="ФИО" v-model="formData.fullName" />
                <v-date-input append-icon="mdi-asterisk" :rules="[rules('required'), rules('date')]" v-model="formData.dateOfBirth" label="Дата рождения"  />
                <v-text-field label="Фото" v-model="formData.photoUrl" />
                <v-checkbox label="Активность" v-model="formData.isActive" />
                <v-btn type="submit">Отправить</v-btn>
                <router-link class="ml-3" to="/">
                    <v-btn>Отмена</v-btn>
                </router-link>
            </v-form>
        </v-container>
    </div>
    <v-snackbar color="success" timeout="3000" v-model="open">
        Успешно!
    </v-snackbar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../store/index.ts';
import { Student } from '../types/index.ts';
import { VDateInput } from 'vuetify/labs/VDateInput'

import { rules } from '../consts/rules.ts';

const route = useRoute();
const store = useStore();
const router = useRouter();

const loading = ref(true);
const valid = ref(false);
const open = ref(false);

const student = ref<Student>();
const formData = ref()

onMounted(() => {
    if(route?.params?.id) {
        const id = route.params.id
        student.value = store.getStudent(+id);
    }

    formData.value = {
        id: student.value?.id ?? null,
        fullName: student.value?.fullName ?? "",
        dateOfBirth: student.value?.dateOfBirth ? new Date(student.value?.dateOfBirth) : null,
        photoUrl: student.value?.photoUrl ?? "",
        isActive: student.value?.isActive ?? false
    }

    loading.value = false;
})

const update = () => {
    if(!valid.value) {
        return
    }

    try {
        const dateOfBirth = formData.value.dateOfBirth.toLocaleDateString('en-CA');
        
        if(formData.value.id) {
            store.editStudent({...formData.value, dateOfBirth})
        } else {
            const newStudent = store.createStudent({...formData.value, dateOfBirth})
            router.push('/student/' + newStudent.id)
        }

        open.value = true;

    } catch(err) {
        console.error(err);
    }
    
}
</script>