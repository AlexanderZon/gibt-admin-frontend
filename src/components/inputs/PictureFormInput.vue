<template>
    <div>
        <template v-if="(picture == null)">
            <v-btn variant="plain" flat icon @click="showIconFormDialog">
                <v-icon>mdi-image-plus</v-icon>
            </v-btn>
        </template>
        <template v-else>
            <v-lazy>
                <v-img class="picture-uploader-container" :width="width" :aspect-ratio="aspectRatio" :src="picture" :cover="cover" @click="showIconFormDialog"></v-img>
            </v-lazy>
        </template>
        
        <v-dialog v-model="icon_dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Upload Icon</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-file-input accept="image/*" label="Icon" v-model="files"
                                    :error="v$.files.$dirty && v$.files.$error"
                                    :rules="[
                                        !v$.files.required.$invalid || 'This field is required',
                                    ]"></v-file-input>
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
    </div>
</template>

<script setup lang="ts">
    import type { Ref } from 'vue'
    import { ref, computed, PropType } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { requiredIf } from '@vuelidate/validators'

    const props = defineProps({
        url: { type: String as PropType<string|null>, default: null },
        picture: { type: String as PropType<string|null>, default: null },
        loading: { type: Boolean, default: false },
        width: { type: String, default: '50' },
        aspectRatio: { type: String, default: '1' },
        cover: { type: Boolean, default: false }
    })
    
    const emit = defineEmits(['update', 'upload'])

    let icon_dialog = ref(false)
    let component_loading = ref(false)
    let files: Ref<File[]> = ref([])
    const rules = computed(() => {
        return {
            files: { required: requiredIf(() => {
                return files.value.length == 0;
            }) }
        }
    })
    const v$ = useVuelidate(rules, { files })

    let showIconFormDialog = function () {
        icon_dialog.value = true
        files.value = []
        v$.value.files.$reset()
    }
    let closeIconFormDialog = function () {
        icon_dialog.value = false
    }
    let handleIconFormSubmit = async function() {
        v$.value.files.$validate()
        if(!v$.value.files.$invalid){
            icon_dialog.value = false
            component_loading.value = true
            if(props.url != null){
                console.log('url: ', props.url)
                const response = await window.api.post(`${props.url}`, { file: files.value[0] }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                emit('update', response.data.data)
                component_loading.value = false
            } else {
                console.log('upload')
                emit('upload', files)
            }
        }
    }
</script>

<style>
    .picture-uploader-container {
        cursor: pointer
    }
</style>