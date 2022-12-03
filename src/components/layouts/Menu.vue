<template>
    <v-navigation-drawer :value="value" temporary>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/10.jpg"
            title="AlexanderZon"></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" router :to="{ name: 'home' }"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Characters" value="characters" router :to="{ name: 'characters' }"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Weapons" value="weapons"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Artifacts" value="artifacts"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Materials" value="materials"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Living Beings" value="living_beings"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Elements" value="elements"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Visions" value="visions"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Associations" value="associations"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
    const props = defineProps({
        value: { type: Boolean, required: false }
    })
</script>