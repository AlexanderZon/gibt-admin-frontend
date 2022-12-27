<template>
    <div>
        <v-card>
            <v-toolbar>
                <!-- <template v-slot:prepend>
                <v-btn icon="$menu"></v-btn>
                </template> -->
                <v-toolbar-title class="text-h6 pl-3">
                    Ascension Materials
                </v-toolbar-title>
                <v-text-field class="mr-2" label="Search" v-model="search" required hide-details density="compact"
                    variant="filled" append-inner-icon="mdi-magnify"></v-text-field>
                <template v-slot:append>
                    <v-btn variant="plain" icon="mdi-plus" @click="showFormDialog({})"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <DataTable :items="items" :headers="headers" :search="search">
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
                    <template #item.types="{ item }">
                        <template v-for="(ascension_material_type, index) in item.ascension_material_types">
                            {{ ascension_material_type.name }}{{ index < item.ascension_material_types.length-1 ? ', ' : '' }}
                        </template>
                    </template>
                    <template #item.actions="{ item }">
                        <span class="d-flex flex-row">
                            <v-btn color="amber" variant="plain" flat icon @click="showFormDialog(item)">
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
        <v-dialog v-model="form_dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Ascension Materials Form</span>
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
                            <v-col cols="12">
                                <v-text-field ref="actualModelRarity" label="Rarity"
                                    :error="v$.actual_model.rarity.$dirty && v$.actual_model.rarity.$error"
                                    :rules="[
                                        !v$.actual_model.rarity.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.rarity"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field ref="actualModelDescription" label="Description"
                                    :error="v$.actual_model.description.$dirty && v$.actual_model.description.$error"
                                    :rules="[
                                        !v$.actual_model.description.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.description"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <MultipleCombobox
                                    v-model="actual_model.ascension_material_types"
                                    :items="ascension_material_types"
                                    label="Select a Ascension Material Type"
                                    item-title="name"
                                    item-value="id"></MultipleCombobox>
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
                Confirm to delete Ascension Material?
            </template>
            <template #content>
                Are you sure you want to delete "{{ actual_model.name }}" ascension material?
            </template>
        </ConfirmDeleteDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { AscensionMaterial } from '@/models/AscensionMaterial'
import { AscensionMaterialType } from '@/models/AscensionMaterialType'
import { useAscensionMaterialsStore } from '@/stores/ascension_materials/index'
import PictureFormInput from '@/components/inputs/PictureFormInput.vue'
import ConfirmDeleteDialog from '@/components/inputs/ConfirmDeleteDialog.vue'
import MultipleCombobox from '@/components/inputs/MultipleCombobox.vue'
import DataTable from '@/components/DataTable.vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const store$ = useAscensionMaterialsStore()
let headers: Array<any> = [
    { text: 'Icon', value: 'icon', sortable: true },
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Rarity', value: 'rarity', sortable: true },
    { text: 'Description', value: 'description', sortable: true },
    { text: 'Types', value: 'types', sortable: true },
    { text: 'Actions', value: 'actions', class: 'text-right' },
]
let items: Ref<Array<AscensionMaterial>> = computed(() => {
    return store$.ascension_materials
})
let ascension_material_types: Array<AscensionMaterialType> = []

let loading = ref(false)
let search: Ref<string> = ref("")

// Data Form
let form_dialog = ref(false)
let actual_model: AscensionMaterial = reactive(new AscensionMaterial())
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
            rarity: { required },
            description: { required },
            icon: { }
        }
    }
})
const v$ = useVuelidate(rules, { actual_model })
let handleFormSubmit = async function () {
    v$.value.actual_model.$validate();

    if (!v$.value.actual_model.$error) {
        console.log('closeDialog')
        form_dialog.value = false
        loading.value = true
        if(actual_model.id == null){
            store$.store(new AscensionMaterial(actual_model)).then((response: any) => {
                loading.value = false
            })
        } else {
            store$.update(new AscensionMaterial(actual_model)).then((response: any) => {
                loading.value = false
            })
        }
    }
}
let updateModelStore = function (element: any) {
    store$.updateStoreElement(new AscensionMaterial(element))
}

// Delete AscensionMaterial
let delete_dialog = ref(false)
let showDeleteDialog = function (element: any) {
    setActualModel(element)
    delete_dialog.value = true
}
let handleDeleteSubmit = function () {
    delete_dialog.value = false
    loading.value = true
    store$.delete(new AscensionMaterial(actual_model)).then((response: any) => {
        loading.value = false
    })
}

onMounted(() => {
    loading.value = true
    store$.get().then((response: any) => {
        loading.value = false

        ascension_material_types = store$.ascension_material_types
        // ascension_material_types = response

    })
})
</script>