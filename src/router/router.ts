// @ts-nocheck
import Index from '@/pages/Index.vue'
import Home from '@/pages/Home/Index.vue'

import Characters from '@/pages/Characters/Index.vue'
import CharactersList from '@/pages/Characters/List.vue'

import Visions from '@/pages/Visions/Index.vue'
import VisionsList from '@/pages/Visions/List.vue'

// Router
import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    { path: '/', component: Index, children: [
        { path: '', name: 'home', component: Home },
        { path: 'characters', component: Characters, children: [
            { path: '', name: 'characters', component: CharactersList }
        ] },
        { path: 'visions', component: Visions, children: [
            { path: '', name: 'visions', component: VisionsList }
        ] },
    ] },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router