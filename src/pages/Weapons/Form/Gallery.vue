<template>
    <v-card class="mt-4">
        <v-toolbar>
            <v-toolbar-title class="text-h6">
                Weapon Gallery
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="4">
                        <v-row>
                            <v-col cols="12" class="text-center d-flex flex-row justify-center flex-grow-1">
                                <PictureFormInput width="100" :picture="modelValue.icon" @upload="uploadIconPicture"></PictureFormInput>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                Icon
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="4">
                        <v-row>
                            <v-col cols="12" class="text-center d-flex flex-row justify-center flex-grow-1">
                                <PictureFormInput width="100" :picture="modelValue.awakened_icon" @upload="uploadSideIconPicture"></PictureFormInput>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                Side Icon
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="4">
                        <v-row>
                            <v-col cols="12" class="text-center d-flex flex-row justify-center flex-grow-1">
                                <PictureFormInput width="100" :picture="modelValue.gacha_card" @upload="uploadGachaCardPicture"></PictureFormInput>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                Gacha Card
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
import type { Ref } from 'vue'
import { Weapon } from '@/models/Weapon'
import { useWeaponsStore } from '@/stores/weapons/index'
import PictureFormInput from '@/components/inputs/PictureFormInput.vue'

const props = defineProps({
    modelValue: { type: Object as PropType<Weapon>, default: null },
})
const emit = defineEmits(['update:modelValue'])
const store$ = useWeaponsStore()

// Images
let uploadIconPicture = async function (files: Ref<File[]>) {
    store$.picture(new Weapon(props.modelValue), files.value, 'icon').then((response: any) => {
        props.modelValue.fill(response)
    })
}
let uploadSideIconPicture = async function (files: Ref<File[]>) {
    store$.picture(new Weapon(props.modelValue), files.value, 'awakened_icon').then((response: any) => {
        props.modelValue.fill(response)
    })
}
let uploadGachaCardPicture = async function (files: Ref<File[]>) {
    store$.picture(new Weapon(props.modelValue), files.value, 'gacha_card').then((response: any) => {
        props.modelValue.fill(response)
    })
}

</script>