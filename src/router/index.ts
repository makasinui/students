import { createRouter, createWebHashHistory } from "vue-router";
import Students from "../pages/Students.vue";

const routes = [
    {
        path: '/',
        component: Students
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})