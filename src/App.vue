<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from './store';
import Layout from './components/Layout.vue';
const store = useStore();

const students = computed(() => store.getStudents);
console.log(students.value)
</script>