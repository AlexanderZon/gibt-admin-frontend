<template>
    <div>
        <v-card>
            <v-toolbar>
                <v-toolbar-title class="text-h6 pl-3">
                    Weapons
                </v-toolbar-title>
                <v-text-field class="mr-2" label="Search" v-model="search" required hide-details density="compact"
                    variant="filled" append-inner-icon="mdi-magnify"></v-text-field>
                <template v-slot:append>
                    <v-btn variant="plain" icon="mdi-plus" @click="$router.push({ name: 'weapons/create' })"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <DataTable :items="items" :headers="headers" :search="search" :pagination="pagination">
                    <template #item.icon="{ item }">
                        <PictureFormInput :picture="item.icon" :width="'50'" :url="`${store$.$base_url}/${item.id}/picture`"
                            @update="updateModelStore"></PictureFormInput>
                    </template>
                    <template #item.name="{ item }">
                        {{ item.name }}
                    </template>
                    <template #item.rarity="{ item }">
                        {{ item.rarity }}
                    </template>
                    <template #item.description="{ item }">
                        {{ item.description }}
                    </template>
                    <template #item.weapon_type.name="{ item }">
                        <span v-if="item.weapon_type != null && item.weapon_type.icon != null" class="d-flex flex-row">
                            <v-lazy width="50">
                                <v-img :src="item.weapon_type.icon" :alt="item.weapon_type.name" height="50"></v-img>
                            </v-lazy>
                        </span>
                        <span v-else>-</span>
                    </template>
                    <template #item.ascension_materials="{ item }">
                        <span class="d-flex flex-row">
                            <template v-for="(ascension_material, index) in item.ascension_materials">
                                <v-lazy width="50" class="mr-2">
                                    <v-img v-if="ascension_material != null && ascension_material.icon != null" :src="ascension_material.icon" :alt="ascension_material.name" height="50"></v-img>
                                </v-lazy>
                            </template>
                        </span>
                    </template>
                    <template #item.actions="{ item }">
                        <span class="d-flex flex-row justify-end">
                            <v-btn color="amber" variant="plain" flat icon router :to="{ name: 'weapons/edit', params: { id: item.id }}">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn color="red" variant="plain" flat icon @click="showDeleteDialog(item)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </span>
                    </template>
                </DataTable>
            </v-card-text>
        </v-card>
        <ConfirmDeleteDialog v-model="delete_dialog" @confirm="handleDeleteSubmit">
            <template #title>
                Confirm to delete Weapon?
            </template>
            <template #content>
                Are you sure you want to delete "{{ actual_model.name }}" weapon?
            </template>
        </ConfirmDeleteDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { Ref,  } from 'vue'
import { Weapon } from '@/models/Weapon'
import { useWeaponsStore } from '@/stores/weapons/index'
import PictureFormInput from '@/components/inputs/PictureFormInput.vue'
import ConfirmDeleteDialog from '@/components/inputs/ConfirmDeleteDialog.vue'
import DataTable from '@/components/DataTable.vue'
import { Pagination } from '@/types/Pagination'

const store$ = useWeaponsStore()
let headers: Array<any> = [
    { text: 'Icon', value: 'icon', sortable: true },
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Rarity', value: 'rarity', sortable: true },
    { text: 'Type', value: 'weapon_type.name', sortable: true },
    { text: 'Ascension Materials', value: 'ascension_materials', sortable: true },
    { text: 'Actions', value: 'actions', class: 'text-right' },
]
let pagination = new Pagination({ itemsPerPage: -1 })
let items: Ref<Array<Weapon>> = computed(() => {
    return store$.weapons
})

let loading = ref(false)
let search: Ref<string> = ref("")

// Data Form
let form_dialog = ref(false)
let actual_model: Weapon = reactive(new Weapon())
let setActualModel = function(element: any){
    actual_model.fill(element)
}
let updateModelStore = function (element: any) {
    store$.updateStoreElement(new Weapon(element))
}

// Delete Weapon
let delete_dialog = ref(false)
let showDeleteDialog = function (element: any) {
    setActualModel(element)
    delete_dialog.value = true
}
let handleDeleteSubmit = function () {
    delete_dialog.value = false
    loading.value = true
    store$.delete(new Weapon(actual_model)).then((response: any) => {
        loading.value = false
    })
}

onMounted(() => {
    loading.value = true
    store$.get().then((response: any) => {
        loading.value = false
    })
})
</script>