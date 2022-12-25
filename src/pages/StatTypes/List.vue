<template>
    <div>
        <v-card>
            <v-toolbar>
                <!-- <template v-slot:prepend>
                <v-btn icon="$menu"></v-btn>
                </template> -->

                <v-toolbar-title class="text-h6 pl-3">
                    Stat Types
                </v-toolbar-title>
                <v-text-field class="mr-2" label="Search" v-model="search" required hide-details density="compact"
                    variant="filled" append-inner-icon="mdi-magnify"></v-text-field>

                <template v-slot:append>

                    <v-btn variant="plain" icon="mdi-plus" @click="showFormDialog({})"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <DataTable :items="items" :headers="headers" :search="search">
                    <template #item.code="{ item }">
                        {{ item.code }}
                    </template>
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
                    <span class="text-h5">StatTypes Form</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field ref="actualModelCode" label="Code"
                                    :error="v$.actual_model.code.$dirty && v$.actual_model.code.$error"
                                    :rules="[
                                        !v$.actual_model.code.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.code"></v-text-field>
                            </v-col>
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
                Confirm to delete Stat Type?
            </template>
            <template #content>
                Are you sure you want to delete "{{ actual_model.name }}" stat type?
            </template>
        </ConfirmDeleteDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { StatType } from '@/models/StatType'
import { useStatTypesStore } from '@/stores/stat_types/index'
import ConfirmDeleteDialog from '@/components/inputs/ConfirmDeleteDialog.vue'
import DataTable from '@/components/DataTable.vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const store$ = useStatTypesStore()
let headers: Array<any> = [
    { text: 'Code', value: 'code', sortable: true },
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Actions', value: 'actions', class: 'text-right' },
]
let items: Ref<Array<StatType>> = computed(() => {
    return store$.stat_types
})

let loading = ref(false)
let search: Ref<string> = ref("")

// Data Form
let form_dialog = ref(false)
let actual_model: StatType = reactive(new StatType())
let setActualModel = function(element: any){
    v$.value.actual_model.$reset()
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
            code: { required }
        }
    }
})
const v$ = useVuelidate(rules, { actual_model })
let handleFormSubmit = async function () {
    v$.value.actual_model.$validate();

    if (!v$.value.actual_model.$error) {
        form_dialog.value = false
        loading.value = true
        if(actual_model.id == null){
            store$.store(new StatType(actual_model)).then((response: any) => {
                loading.value = false
            })
        } else {
            store$.update(new StatType(actual_model)).then((response: any) => {
                loading.value = false
            })
        }
    }
}
let updateModelStore = function (element: any) {
    store$.updateStoreElement(new StatType(element))
}

// Delete StatType
let delete_dialog = ref(false)
let showDeleteDialog = function (element: any) {
    setActualModel(element)
    delete_dialog.value = true
}
let handleDeleteSubmit = function () {
    delete_dialog.value = false
    loading.value = true
    store$.delete(new StatType(actual_model)).then((response: any) => {
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