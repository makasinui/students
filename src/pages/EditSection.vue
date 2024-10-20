<template>
    <router-link class="ml-3" to="/sections">
        <v-btn>Назад</v-btn>
    </router-link>
    <div v-if="!loading">
        <v-container>
            <h1>{{ formData.id ? 'Редактирование' : "Создание" }} секции</h1>
            <v-form @submit.prevent="update" v-model="valid" class="mt-4">
                <v-text-field append-icon="mdi-asterisk" :rules="[rules('required'), rules('min', 4)]" label="Название" v-model="formData.name" />
                <v-select 
                    class="mb-4"
                    hide-details
                    :items="studentsItems"
                    item-value="studentId"
                    item-title="head.fullName"
                    v-model="formData.students"
                    label="Студенты"
                    multiple
                />
                <v-btn type="submit">Отправить</v-btn>
                <router-link class="ml-3" to="/sections">
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
import { Section, Student } from '../types/index.ts';

import { rules } from '../consts/rules.ts';

const route = useRoute();
const store = useStore();
const router = useRouter();

const loading = ref(true);
const valid = ref(false);
const open = ref(false);

const section = ref<Section>();
const students = computed(() => store.students);
const studentsItems = students.value.map(student => ({studentId: student.id, head: {...student}}))
const formData = ref()

const initFormData = () => {
    formData.value = {
        id: section.value?.id ?? null,
        name: section.value?.name ?? "",
        students: section.value?.students ?? []
    }
}

onMounted(() => {
    if(route?.params?.id) {
        const id = route.params.id
        section.value = store.getSection(+id);
    }

    initFormData();

    loading.value = false;
})

const update = () => {
    if(!valid.value) {
        return
    }

    try {
        // const dateOfBirth = formData.value.dateOfBirth.toLocaleDateString('en-CA');
        formData.value.students = formData.value.students.map(studentId => {
            if(typeof studentId === 'number') {
                const student = studentsItems.find(item => item.studentId === studentId);
                return {...student}
            }
            return {...studentId}
        })
        console.log(formData.value.students)
        if(formData.value.id) {
            store.editSection(formData.value)
        } else {
            const newSection = store.createSection(formData.value)
            router.push('/section/' + newSection.id)
            section.value = newSection;
            initFormData();
        }

        open.value = true;

    } catch(err) {
        console.error(err);
    }
    
}
</script>