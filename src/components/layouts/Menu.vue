<template>
    <v-navigation-drawer :value="value" temporary>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/10.jpg"
            title="AlexanderZon"></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" router :to="{ name: 'home' }"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Characters" value="characters" router :to="{ name: 'characters' }"></v-list-item>
            <v-list-item prepend-icon="mdi-sword" title="Weapons" value="weapons"></v-list-item>
            <v-list-item prepend-icon="mdi-glass-wine" title="Artifacts" value="artifacts"></v-list-item>
            <v-list-item prepend-icon="mdi-package-variant" title="Materials" value="materials"></v-list-item>
            <v-list-item prepend-icon="mdi-paw" title="Living Beings" value="living_beings"></v-list-item>
            <v-list-item prepend-icon="mdi-liquid-spot" title="Elements" value="elements"></v-list-item>
            <v-list-item prepend-icon="mdi-medal" title="Visions" value="visions" router :to="{ name: 'visions' }"></v-list-item>
            <v-list-item prepend-icon="mdi-city" title="Associations" value="associations"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
    const props = defineProps({
        value: { type: Boolean, required: false }
    })
</script>