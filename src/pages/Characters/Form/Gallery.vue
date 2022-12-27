<template>
    <v-card class="mt-4">
        <v-toolbar>
            <v-toolbar-title class="text-h6">
                Character Gallery
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-row>
                            <v-col cols="12" class="text-center d-flex flex-row justify-center flex-grow-1">
                                <PictureFormInput width="100" :picture="modelValue.icon" @upload="uploadIconPicture"></PictureFormInput>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                Icon
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3">
                        <v-row>
                            <v-col cols="12" class="text-center d-flex flex-row justify-center flex-grow-1">
                                <PictureFormInput width="100" :picture="modelValue.side_icon" @upload="uploadSideIconPicture"></PictureFormInput>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                Side Icon
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3">
                        <v-row>
                            <v-col cols="12" class="text-center d-flex flex-row justify-center flex-grow-1">
                                <PictureFormInput width="100" :picture="modelValue.gacha_card" @upload="uploadGachaCardPicture"></PictureFormInput>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                Gacha Card
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3">
                        <v-row>
                            <v-col cols="12" class="text-center d-flex flex-row justify-center flex-grow-1">
                                <PictureFormInput width="100" :picture="modelValue.gacha_splash" @upload="uploadGachaSplashPicture"></PictureFormInput>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                Gacha Splash
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
import { Character } from '@/models/Character'
import { useCharactersStore } from '@/stores/characters/index'
import PictureFormInput from '@/components/inputs/PictureFormInput.vue'

const props = defineProps({
    modelValue: { type: Object as PropType<Character>, default: null },
})
const emit = defineEmits(['update:modelValue'])
const store$ = useCharactersStore()

// Images
let uploadIconPicture = async function (files: Ref<File[]>) {
    store$.picture(new Character(props.modelValue), files.value, 'icon').then((response: any) => {
        props.modelValue.fill(response)
    })
}
let uploadSideIconPicture = async function (files: Ref<File[]>) {
    store$.picture(new Character(props.modelValue), files.value, 'side_icon').then((response: any) => {
        props.modelValue.fill(response)
    })
}
let uploadGachaCardPicture = async function (files: Ref<File[]>) {
    store$.picture(new Character(props.modelValue), files.value, 'gacha_card').then((response: any) => {
        props.modelValue.fill(response)
    })
}
let uploadGachaSplashPicture = async function (files: Ref<File[]>) {
    store$.picture(new Character(props.modelValue), files.value, 'gacha_splash').then((response: any) => {
        props.modelValue.fill(response)
    })
}

</script>