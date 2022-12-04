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

                <template v-slot:append>
                    <v-btn icon="mdi-plus" @click="showFormDialog"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <v-table>
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
                        <tr v-for="item in items" :key="item.name">
                            <td>
                                <template v-if="(item.icon == null)">
                                    <v-btn variant="plain" flat icon @click="showIconFormDialog(item)">
                                        <v-icon>mdi-image-plus</v-icon>
                                    </v-btn>
                                </template>
                                <template v-else>
                                    <v-img class="bg-white" width="50" :aspect-ratio="1" :src="item.icon" cover ></v-img>
                                </template>
                            </td>
                            <td>{{ item.name }}</td>
                            <td class="text-right">
                                <v-btn color="amber" variant="plain" flat icon>
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn color="red" variant="plain" flat icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
        <v-row justify="center">
            <v-dialog v-model="form_dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Visions Form</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Name" v-model="vision_model.name" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-file-input accept="image/*" label="Icon" v-model="vision_icon"></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeFormDialog">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="handleFormSubmit">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="icon_dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Upload Icon</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-file-input accept="image/*" label="Icon" v-model="vision_icon"></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeIconFormDialog">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="handleIconFormSubmit">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { Vision } from '@/models/Vision'
import { useVisionsStore } from '@/stores/visions/index'

const visionsStore = useVisionsStore()
let items: Ref<Array<Vision>> = computed(() => {
    return visionsStore.visions
})

let loading = ref(false)

let vision_model: Ref<Vision>
let vision_icon: Ref<File[]>
    
// Data Form
let form_dialog = ref(false)
let showFormDialog = function () {
    vision_model = ref(new Vision({}));
    vision_icon = ref([])
    form_dialog.value = true
}
let closeFormDialog = function () {
    form_dialog.value = false
}
let handleFormSubmit = function() {
    form_dialog.value = false
    loading.value = true
    visionsStore.store(vision_model.value).then((response: any) => {
        loading.value = false
    })
}

// Icon Form
let icon_dialog = ref(false)
let showIconFormDialog = function (vision: Vision) {
    vision_model = ref(vision);
    vision_icon = ref([])
    icon_dialog.value = true
}
let closeIconFormDialog = function () {
    icon_dialog.value = false
}
let handleIconFormSubmit = function() {
    icon_dialog.value = false
    loading.value = true
    console.log("Vision model: ", vision_model)
    visionsStore.picture(vision_model.value, vision_icon.value).then((response: any) => {
        loading.value = false
    })
}

onMounted(() => {
    loading.value = true
    visionsStore.get().then((response: any) => {
        loading.value = false
    })
})
</script>