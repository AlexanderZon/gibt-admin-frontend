<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-toolbar>
                    <template v-slot:prepend>
                        <v-btn variant="plain" icon="mdi-arrow-left" @click="$router.push({ name: 'characters' })"></v-btn>
                    </template>
    
                    <v-toolbar-title class="text-h6">
                        Character Form
                    </v-toolbar-title>
                    <template v-slot:append>
                        <v-btn variant="plain" icon="mdi-content-save" @click="handleFormSubmit" :loading="loading"></v-btn>
                    </template>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field ref="actualModelName" label="Name"
                                    :error="v$.actual_model.name.$dirty && v$.actual_model.name.$error"
                                    :rules="[
                                        !v$.actual_model.name.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.name"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field ref="actualModelTitle" label="Title"
                                    :error="v$.actual_model.title.$dirty && v$.actual_model.title.$error"
                                    :rules="[
                                        !v$.actual_model.title.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.title"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field ref="actualModelOccupation" label="Occupation"
                                    :error="v$.actual_model.occupation.$dirty && v$.actual_model.occupation.$error"
                                    :rules="[
                                        !v$.actual_model.occupation.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.occupation"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-switch
                                    v-model="actual_model.released"
                                    hide-details
                                    inset
                                    :label="`Released: ${actual_model.released ? 'yes' : 'no'}`"
                                ></v-switch>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    label="Day Of Birth"
                                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]"
                                    v-model="actual_model.day_of_birth"
                                    :error="v$.actual_model.day_of_birth.$dirty && v$.actual_model.day_of_birth.$error"
                                    :rules="[
                                        !v$.actual_model.day_of_birth.required.$invalid || 'This field is required',
                                    ]"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-select
                                    label="Month Of Birth"
                                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                                    v-model="actual_model.month_of_birth"
                                    :error="v$.actual_model.month_of_birth.$dirty && v$.actual_model.month_of_birth.$error"
                                    :rules="[
                                        !v$.actual_model.month_of_birth.required.$invalid || 'This field is required',
                                    ]"
                                ></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field ref="actualModelRarity" label="Rarity"
                                    :error="v$.actual_model.rarity.$dirty && v$.actual_model.rarity.$error"
                                    :rules="[
                                        !v$.actual_model.rarity.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.rarity"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field ref="actualModelConstellation" label="Constellation"
                                    :error="v$.actual_model.constellation.$dirty && v$.actual_model.constellation.$error"
                                    :rules="[
                                        !v$.actual_model.constellation.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.constellation"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field ref="actualModelDescription" label="Description"
                                    :error="v$.actual_model.description.$dirty && v$.actual_model.description.$error"
                                    :rules="[
                                        !v$.actual_model.description.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.description"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <Combobox
                                    v-model="actual_model.element"
                                    :items="elements"
                                    label="Element"
                                    item-title="name"
                                    item-icon="icon"
                                    item-value="id"
                                    :custom-filter="filter"></Combobox>
                            </v-col>
                            <v-col cols="3">
                                <Combobox
                                    v-model="actual_model.vision" 
                                    :items="visions"
                                    label="Vision"
                                    item-title="name"
                                    item-icon="icon"
                                    item-value="id"
                                    :custom-filter="filter"></Combobox>
                            </v-col>
                            <v-col cols="3">
                                <Combobox
                                    v-model="actual_model.weapon_type" 
                                    :items="weapon_types"
                                    label="Weapon Type"
                                    item-title="name"
                                    item-icon="icon"
                                    item-value="id"
                                    :custom-filter="filter"></Combobox>
                            </v-col>
                            <v-col cols="3">
                                <Combobox
                                    v-model="actual_model.association" 
                                    :items="associations"
                                    label="Association"
                                    item-title="name"
                                    item-value="id"
                                    :custom-filter="filter"></Combobox>
                            </v-col>
                            <v-col cols="6">
                                <Combobox
                                    v-model="actual_model.ascension_materials"
                                    :items="ascension_materials"
                                    label="Ascension Materials"
                                    item-title="name"
                                    item-icon="icon"
                                    item-value="id"
                                    multiple
                                    :custom-filter="ascensionMaterialFilter"></Combobox>
                            </v-col>
                            <v-col cols="6">
                                <Combobox
                                    v-model="actual_model.skill_ascension_materials"
                                    :items="ascension_materials"
                                    label="Skill Ascension Materials"
                                    item-title="name"
                                    item-icon="icon"
                                    item-value="id"
                                    multiple
                                    :custom-filter="ascensionMaterialFilter"></Combobox>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-col>
        <template v-if="actual_model.id != null">
            <v-col cols="12">
                <CharacterGallery v-model="actual_model"></CharacterGallery>
            </v-col>
            <v-col cols="12">
                <CharacterStats v-model="actual_model"></CharacterStats>
            </v-col>
        </template>
    </v-row>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useCharactersStore } from '@/stores/characters/index'
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf } from '@vuelidate/validators'
import { Character } from '@/models/Character'
import { AscensionMaterial } from '@/models/AscensionMaterial'
import { Vision } from '@/models/Vision'
import { Association } from '@/models/Association'
import { WeaponType } from '@/models/WeaponType'
import Combobox from '@/components/inputs/Combobox.vue'
import { Element } from '@/models/Element'
import { useRouter, useRoute } from 'vue-router'
import { AscensionMaterialType } from '@/models/AscensionMaterialType'
import CharacterGallery from './Form/Gallery.vue'
import CharacterStats from './Form/Stats.vue'

const store$ = useCharactersStore()
const route = useRoute()
const router = useRouter()

let loading = ref(false)
let ascension_materials: Ref<Array<AscensionMaterial>> = computed(() => {
    return store$.ascension_materials
})
let elements: Ref<Array<Element>> = computed(() => {
    return store$.elements
})
let visions: Ref<Array<Vision>> = computed(() => {
    return store$.visions
})
let associations: Ref<Array<Association>> = computed(() => {
    return store$.associations
})
let weapon_types: Ref<Array<WeaponType>> = computed(() => {
    return store$.weapon_types
})

let actual_model: Character = reactive(new Character())

let handleFormSubmit = async function () {
    v$.value.actual_model.$validate();

    if (!v$.value.actual_model.$error) {
        loading.value = true
        if(actual_model.id == null){
            store$.store(new Character(actual_model)).then((response: any) => {
                loading.value = false
                router.push({ name: 'characters' })
            })
        } else {
            store$.update(new Character(actual_model)).then((response: any) => {
                loading.value = false
                router.push({ name: 'characters' })
            })
        }
    }
}

let filter = function(value: string, query: string, item: any){
    return item.value['name'].toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) > -1
}

let ascensionMaterialFilter = function(value: string, query: string, item: any){
    return item.value['name'].toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) > -1 || item.value.ascension_material_types.some((type: AscensionMaterialType) => type.name.toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) > -1)
}

// Validator
const rules = computed(() => {
    return {
        actual_model: {
            name: { required },
            title: { required },
            occupation: { required },
            rarity: { required },
            day_of_birth: { required },
            month_of_birth: { required },
            constellation: { required },
            description: { required },
        },
    }
})

const v$ = useVuelidate(rules, { actual_model })

onMounted(() => {
    loading.value = true
    if(typeof route.params.id !== 'undefined'){
        store$.edit(new Character({ id: route.params.id })).then((response: Character) => {
            loading.value = false
            actual_model.fill(response)
        })
    } else {
        store$.create().then((response: Character) => {
            loading.value = false
            actual_model.fill(response)
        })
    }
})
</script>