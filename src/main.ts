import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createPinia } from "pinia";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import {router} from './router';
import App from './App.vue'
import './style.css'

const pinia = createPinia();
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    }
});
const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount('#app')
