<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-toolbar>
                    <template v-slot:prepend>
                        <v-btn variant="plain" icon="mdi-arrow-left" @click="$router.push({ name: 'weapons' })"></v-btn>
                    </template>
    
                    <v-toolbar-title class="text-h6">
                        Weapon Form
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
                                <v-text-field ref="actualModelRarity" label="Rarity"
                                    :error="v$.actual_model.rarity.$dirty && v$.actual_model.rarity.$error"
                                    :rules="[
                                        !v$.actual_model.rarity.required.$invalid || 'This field is required',
                                    ]"
                                    v-model="actual_model.rarity"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <Combobox
                                    v-model="actual_model.weapon_type" 
                                    :items="weapon_types"
                                    label="Type"
                                    item-title="name"
                                    item-icon="icon"
                                    item-value="id"
                                    :custom-filter="filter"></Combobox>
                            </v-col>
                            <v-col cols="3">
                                <v-switch
                                    v-model="actual_model.released"
                                    hide-details
                                    inset
                                    :label="`Released: ${actual_model.released ? 'yes' : 'no'}`"
                                ></v-switch>
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
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-col>
        <template v-if="actual_model.id != null">
            <v-col cols="12">
                <WeaponGallery v-model="actual_model"></WeaponGallery>
            </v-col>
            <v-col cols="12">
                <WeaponStats v-model="actual_model"></WeaponStats>
            </v-col>
        </template>
    </v-row>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useWeaponsStore } from '@/stores/weapons/index'
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf } from '@vuelidate/validators'
import { Weapon } from '@/models/Weapon'
import { AscensionMaterial } from '@/models/AscensionMaterial'
import { WeaponType } from '@/models/WeaponType'
import { StatType } from '@/models/StatType'
import Combobox from '@/components/inputs/Combobox.vue'
import { useRouter, useRoute } from 'vue-router'
import { AscensionMaterialType } from '@/models/AscensionMaterialType'
import WeaponGallery from './Form/Gallery.vue'
import WeaponStats from './Form/Stats.vue'

const store$ = useWeaponsStore()
const route = useRoute()
const router = useRouter()

let loading = ref(false)
let ascension_materials: Ref<Array<AscensionMaterial>> = computed(() => {
    return store$.ascension_materials
})
let weapon_types: Ref<Array<WeaponType>> = computed(() => {
    return store$.weapon_types
})

let actual_model: Weapon = reactive(new Weapon())

let handleFormSubmit = async function () {
    v$.value.actual_model.$validate();

    if (!v$.value.actual_model.$error) {
        loading.value = true
        if(actual_model.id == null){
            store$.store(new Weapon(actual_model)).then((response: any) => {
                loading.value = false
                router.push({ name: 'weapons' })
            })
        } else {
            store$.update(new Weapon(actual_model)).then((response: any) => {
                loading.value = false
                router.push({ name: 'weapons' })
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
            rarity: { required },
            weapon_type: { required },
            description: { required },
        },
    }
})

const v$ = useVuelidate(rules, { actual_model })

onMounted(() => {
    loading.value = true
    if(typeof route.params.id !== 'undefined'){
        store$.edit(new Weapon({ id: route.params.id })).then((response: Weapon) => {
            loading.value = false
            actual_model.fill(response)
        })
    } else {
        store$.create().then((response: Weapon) => {
            loading.value = false
            actual_model.fill(response)
        })
    }
})
</script>