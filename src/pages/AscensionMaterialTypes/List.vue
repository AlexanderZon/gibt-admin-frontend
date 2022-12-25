<template>
    <div>
        <v-card>
            <v-toolbar>
                <!-- <template v-slot:prepend>
                <v-btn icon="$menu"></v-btn>
                </template> -->

                <v-toolbar-title class="text-h6 pl-3">
                    Ascension Material Types
                </v-toolbar-title>
                <v-text-field class="mr-2" label="Search" v-model="search" required hide-details density="compact"
                    variant="filled" append-inner-icon="mdi-magnify"></v-text-field>

                <template v-slot:append>

                    <v-btn variant="plain" icon="mdi-plus" @click="showFormDialog({})"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <DataTable :items="items" :headers="headers" :search="search">
                    <template #item.name="{ item }">
                        {{ item.name }}
                    </template>
                    <template #item.actions="{ item }">
                        <v-btn color="amber" variant="plain" flat icon @click="showFormDialog(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn color="red" variant="plain" flat icon @click="showDeleteDialog(item)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </DataTable>
            </v-card-text>
        </v-card>
        <v-dialog v-model="form_dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Ascension Material Types Form</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field ref="actualModelName" label="Name"
                                    :error="v$.actual_model.name.$dirty && v$.actual_model.name.$error"
                                    :rules="[
                                        !v$.actual_model.name.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.name"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
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
        <ConfirmDeleteDialog v-model="delete_dialog" @confirm="handleDeleteSubmit">
            <template #title>
                Confirm to delete Ascension Material Type?
            </template>
            <template #content>
                Are you sure you want to delete "{{ actual_model.name }}" ascension material type?
            </template>
        </ConfirmDeleteDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { AscensionMaterialType } from '@/models/AscensionMaterialType'
import { useAscensionMaterialTypesStore } from '@/stores/ascension_material_types/index'
import ConfirmDeleteDialog from '@/components/inputs/ConfirmDeleteDialog.vue'
import DataTable from '@/components/DataTable.vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const store$ = useAscensionMaterialTypesStore()
let headers: Array<any> = [
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Actions', value: 'actions', class: 'text-right' },
]
let items: Ref<Array<AscensionMaterialType>> = computed(() => {
    return store$.ascension_material_types
})

let loading = ref(false)
let search: Ref<string> = ref("")

// Data Form
let form_dialog = ref(false)
let actual_model: AscensionMaterialType = reactive(new AscensionMaterialType())
let setActualModel = function(element: any){
    v$.value.actual_model.name.$reset()
    actual_model.fill(element)
}
let showFormDialog = function (element: any) {
    setActualModel(element);
    form_dialog.value = true
}
let closeFormDialog = function () {
    form_dialog.value = false
}
const rules = computed(() => {
    return {
        actual_model: {
            name: { required },
            icon: { required }
        }
    }
})
const v$ = useVuelidate(rules, { actual_model })
let handleFormSubmit = async function () {
    v$.value.actual_model.name.$validate();

    if (!v$.value.actual_model.name.$error) {
        form_dialog.value = false
        loading.value = true
        if(actual_model.id == null){
            store$.store(new AscensionMaterialType(actual_model)).then((response: any) => {
                loading.value = false
            })
        } else {
            store$.update(new AscensionMaterialType(actual_model)).then((response: any) => {
                loading.value = false
            })
        }
    }
}
let updateModelStore = function (element: any) {
    store$.updateStoreElement(new AscensionMaterialType(element))
}

// Delete AscensionMaterialType
let delete_dialog = ref(false)
let showDeleteDialog = function (element: any) {
    setActualModel(element)
    delete_dialog.value = true
}
let handleDeleteSubmit = function () {
    delete_dialog.value = false
    loading.value = true
    store$.delete(new AscensionMaterialType(actual_model)).then((response: any) => {
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