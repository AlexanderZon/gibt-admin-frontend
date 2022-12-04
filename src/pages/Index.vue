<template>
    <v-app>
        <v-app-bar :elevation="2">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click="toogleDrawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Genshin Impact Building Tool</v-app-bar-title>
            <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
        </v-app-bar>

        <Menu v-model="drawer" />
        <v-main>
            <v-container transition="scroll-y-transition">
                <router-view v-slot="{ Component, route }">
                    <transition name="bounce">
                        <component :is="Component" :key="route.path" />
                    </transition>
                </router-view>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script setup lang="ts">
    import Menu from '@/components/layouts/Menu.vue'
    import { ref } from 'vue'
    import type { Ref } from 'vue'

    let drawer: Ref<boolean> = ref(true)

    let toogleDrawer = function () {
        drawer.value = !drawer.value
    }
</script>

<style>
    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }
    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
  