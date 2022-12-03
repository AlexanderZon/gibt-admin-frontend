<template>
    <v-app>
      <v-main>
        <v-app-bar :elevation="2">
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click="toogleDrawer"></v-app-bar-nav-icon>
          </template>
  
          <v-app-bar-title>Genshin Impact Building Tool</v-app-bar-title>
          <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
          </template>
        </v-app-bar>
  
        <Menu v-model="drawer"/>
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>
  
  <script setup lang="ts">
    import HelloWorld from '@/components/HelloWorld.vue'
    import Menu from '@/components/layouts/Menu.vue'
    import { ref } from 'vue'
    import type { Ref } from 'vue'
  
    let drawer: Ref<boolean> = ref(true)
  
    let toogleDrawer = function(){
      drawer.value = !drawer.value
    }
  </script>
  