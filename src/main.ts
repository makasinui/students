import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createPinia } from "pinia";


import {router} from './router';
import App from './App.vue'
import './style.css'

const pinia = createPinia();
const vuetify = createVuetify();
const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount('#app')
