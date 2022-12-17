// @ts-nocheck
import Index from '@/pages/Index.vue'
import Home from '@/pages/Home/Index.vue'

import Associations from '@/pages/Associations/Index.vue'
import AssociationsList from '@/pages/Associations/List.vue'

import Characters from '@/pages/Characters/Index.vue'
import CharactersList from '@/pages/Characters/List.vue'

import Elements from '@/pages/Elements/Index.vue'
import ElementsList from '@/pages/Elements/List.vue'

import Visions from '@/pages/Visions/Index.vue'
import VisionsList from '@/pages/Visions/List.vue'

import StatTypes from '@/pages/StatTypes/Index.vue'
import StatTypesList from '@/pages/StatTypes/List.vue'

import WeaponTypes from '@/pages/WeaponTypes/Index.vue'
import WeaponTypesList from '@/pages/WeaponTypes/List.vue'

// Router
import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    { path: '/', component: Index, children: [
        { path: '', name: 'home', component: Home },
        { path: 'associations', component: Associations, children: [
            { path: '', name: 'associations', component: AssociationsList }
        ] },
        { path: 'characters', component: Characters, children: [
            { path: '', name: 'characters', component: CharactersList }
        ] },
        { path: 'elements', component: Elements, children: [
            { path: '', name: 'elements', component: ElementsList }
        ] },
        { path: 'visions', component: Visions, children: [
            { path: '', name: 'visions', component: VisionsList }
        ] },
        { path: 'stat_types', component: StatTypes, children: [
            { path: '', name: 'stat_types', component: StatTypesList }
        ] },
        { path: 'weapon_types', component: WeaponTypes, children: [
            { path: '', name: 'weapon_types', component: WeaponTypesList }
        ] },
    ] },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router