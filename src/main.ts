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

import router from '@/router/router'
app.use(router)

import axios from 'axios'

window.axios = axios

registerPlugins(app)

app.mount('#app')
