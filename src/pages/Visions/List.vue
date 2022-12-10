<template>
    <div>
        <v-card>
            <v-toolbar>
                <!-- <template v-slot:prepend>
                <v-btn icon="$menu"></v-btn>
                </template> -->

                <v-toolbar-title class="text-h6 pl-3">
                    Visions
                </v-toolbar-title>
                <v-text-field class="mr-2" label="Search" v-model="search" required hide-details density="compact" variant="filled" append-inner-icon="mdi-magnify"></v-text-field>

                <template v-slot:append>
                    
                    <v-btn icon="mdi-plus" @click="showFormDialog({})"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <DataTable :items="items" :headers="headers">
                    <template v-slot:item.name="{ item }">
                        {{ item.name }}
                    </template>
                </DataTable>
                <!-- <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Icon
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in filtered_items" :key="item.name">
                            <td>
                                <PictureFormInput :picture="item.icon" :url="`${$store.$base_url}/${item.id}/picture`" @update="updateModelStore"></PictureFormInput>
                            </td>
                            <td>{{ item.name }}</td>
                            <td class="text-right">
                                <v-btn color="amber" variant="plain" flat icon @click="showFormDialog(item)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn color="red" variant="plain" flat icon @click="showDeleteDialog(item)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table> -->
            </v-card-text>
        </v-card>
        <v-dialog v-model="form_dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Visions Form</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Name *" v-model="actual_model.name" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>* Indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey-darken-1" variant="text" @click="closeFormDialog">
                        Close
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="handleFormSubmit">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <ConfirmDeleteDialog v-model="delete_dialog" @confirm="handleDeleteSubmit"></ConfirmDeleteDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { Vision } from '@/models/Vision'
import { useVisionsStore } from '@/stores/visions/index'
import PictureFormInput from '@/components/inputs/PictureFormInput.vue'
import ConfirmDeleteDialog from '@/components/inputs/ConfirmDeleteDialog.vue'
import DataTable from '@/components/DataTable.vue'

const $store = useVisionsStore()
let headers: Array<any> = [
    { text: 'Icon', value: 'icon' },
    { text: 'Name', value: 'icon' },
    { text: 'Actions', value: 'actions', class: 'text-right' },
]
let items: Ref<Array<Vision>> = computed(() => {
    return $store.visions
})

let loading = ref(false)
let search : Ref<String|null> = ref(null)

// Data Form
let form_dialog = ref(false)
let actual_model: Ref<Vision>
let showFormDialog = function (element: any) {
    actual_model = ref(new Vision(element));
    form_dialog.value = true
}
let closeFormDialog = function () {
    form_dialog.value = false
}
let handleFormSubmit = function() {
    form_dialog.value = false
    loading.value = true
    if(actual_model.value.id == null){
        $store.store(actual_model.value).then((response: any) => {
            loading.value = false
        })
    } else {
        $store.update(actual_model.value).then((response: any) => {
            loading.value = false
        })
    }
}
let updateModelStore = function(element:any){
    $store.udpateStoreElement(new Vision(element))
}

// Delete Vision
let delete_dialog = ref(false)
let showDeleteDialog = function (element: any) {
    actual_model = ref(new Vision(element));
    delete_dialog.value = true
}
let handleDeleteSubmit = function (){
    delete_dialog.value = false
    loading.value = true
    $store.delete(actual_model.value).then((response: any) => {
        loading.value = false
    })
}

onMounted(() => {
    loading.value = true
    $store.get().then((response: any) => {
        loading.value = false
    })
})
</script>