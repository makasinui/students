import { createRouter, createWebHistory } from "vue-router";
import Students from "../pages/Students.vue";
import EditStudent from "../components/EditStudent.vue";
import Sections from "../pages/Sections.vue";

const routes = [
    {
        path: '/',
        component: Students
    },
    {
        path: '/student/:id?',
        component: EditStudent
    },
    {
        path: '/sections',
        component: Sections
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
})