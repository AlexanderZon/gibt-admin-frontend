import Index from '@/pages/Index.vue'

import Characters from '@/pages/Characters/Index.vue'
import Home from '@/pages/Home/Index.vue'

// Router
import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    { path: '/', component: Index, children: [
        { path: '', name: 'home', component: Home },
        { path: 'characters', name: 'characters', component: Characters },
    ] },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router