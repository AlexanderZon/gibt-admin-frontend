/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
const app = createApp({})

// Router
import router from '@/router/router'
app.use(router)

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import axios from 'axios'
declare global {
    interface Window {
        api:any;
    }
}
window.api = axios.create({
    baseURL: 'http://localhost:8000/api/admin/',
});

registerPlugins(app)

app.mount('#app')
