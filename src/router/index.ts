import { createRouter, createWebHistory } from "vue-router";
import Students from "../pages/Students.vue";
import EditStudent from "../pages/EditStudent.vue";
import Sections from "../pages/Sections.vue";
import EditSection from "../pages/EditSection.vue";

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
    },
    {
        path: '/section/:id?',
        component: EditSection
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
})