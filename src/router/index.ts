import { createRouter, createWebHistory } from "vue-router";
import Students from "../pages/Students.vue";
import EditStudent from "../components/EditStudent.vue";

const routes = [
    {
        path: '/',
        component: Students
    },
    {
        path: '/student/:id?',
        component: EditStudent
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
})