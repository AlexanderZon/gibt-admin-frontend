<template>
    <div>
        <v-card class="mt-4">
            <v-toolbar>
                <v-toolbar-title class="text-h6">
                    Character Stats
                </v-toolbar-title>
                <template v-slot:append>
                    <v-btn variant="plain" icon="mdi-plus" @click="showFormDialog({})"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <DataTable
                        :headers="headers"
                        :items="modelValue.character_stats"
                        hide-footer>
                        <template #item.level="{ item }">
                            {{ item.level }}
                        </template>
                        <template #item.hp="{ item }">
                            {{ item.hp }}
                        </template>
                        <template #item.atk="{ item }">
                            {{ item.atk }}
                        </template>
                        <template #item.def="{ item }">
                            {{ item.def }}
                        </template>
                        <template #item.crit_rate="{ item }">
                            {{ item.crit_rate }}%
                        </template>
                        <template #item.crit_dmg="{ item }">
                            {{ item.crit_dmg }}%
                        </template>
                        <template #item.variable_stat="{ item }">
                            {{ item.variable_stat_value }} {{ item.variable_stat.name }}
                        </template>
                        <template #item.materials="{ item }">
                            <template v-if="item.char_jewel_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.char_jewel.icon" :quantity="item.char_jewel_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.char_elemental_stone_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.char_elemental_stone.icon" :quantity="item.char_elemental_stone_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.char_local_material_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.char_local_material.icon" :quantity="item.char_local_material_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.char_common_item_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.char_common_item.icon" :quantity="item.char_common_item_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.mora_quantity > 0">
                                <MoraQuantityDisplayer :quantity="item.mora_quantity"></MoraQuantityDisplayer>
                            </template>
                        </template>
                        <template #item.actions="{ item }">
                            <span class="d-flex flex-row justify-end">
                                <v-btn color="amber" variant="plain" flat icon @click="showFormDialog(item)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </span>
                        </template>
                    </DataTable>
                </v-container>
            </v-card-text>
        </v-card>
        
        
        <v-dialog v-model="form_dialog" persistent max-width="1000px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Character Stat Form</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <h3>Stats</h3>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select 
                                            label="Level"
                                            :items="levels" 
                                            item-title="level"
                                            item-value="level"
                                            v-model="actual_model.level"></v-select>
                                        <!-- <v-text-field ref="actualModelLevel" label="Level"
                                            :error="v$.actual_model.level.$dirty && v$.actual_model.level.$error"
                                            :rules="[
                                                !v$.actual_model.level.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.level"></v-text-field> -->
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelHP" label="HP"
                                            :error="v$.actual_model.hp.$dirty && v$.actual_model.hp.$error"
                                            :rules="[
                                                !v$.actual_model.hp.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.hp"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelAttack" label="Attack"
                                            :error="v$.actual_model.atk.$dirty && v$.actual_model.atk.$error"
                                            :rules="[
                                                !v$.actual_model.atk.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.atk"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelDefense" label="Defense"
                                            :error="v$.actual_model.def.$dirty && v$.actual_model.def.$error"
                                            :rules="[
                                                !v$.actual_model.def.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.def"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelCritRate" label="Critical Rate (%)"
                                            :error="v$.actual_model.crit_rate.$dirty && v$.actual_model.crit_rate.$error"
                                            :rules="[
                                                !v$.actual_model.crit_rate.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.crit_rate"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelCritDmg" label="Critical Damage (%)"
                                            :error="v$.actual_model.crit_dmg.$dirty && v$.actual_model.crit_dmg.$error"
                                            :rules="[
                                                !v$.actual_model.crit_dmg.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.crit_dmg"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.variable_stat" 
                                            :items="stat_types"
                                            label="Variable Stat"
                                            item-title="name"
                                            item-value="id"
                                            :error="v$.actual_model.variable_stat.$dirty && v$.actual_model.variable_stat.$error"
                                            :rules="[
                                                !v$.actual_model.variable_stat.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelVariableStatValue" label="Variable Stat Value"
                                            :error="v$.actual_model.variable_stat_value.$dirty && v$.actual_model.variable_stat_value.$error"
                                            :rules="[
                                                !v$.actual_model.variable_stat_value.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.variable_stat_value"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <h3>Materials</h3>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.char_jewel" 
                                            :items="ascension_materials"
                                            label="Jewel"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.char_jewel.$dirty && v$.actual_model.char_jewel.$error"
                                            :rules="[
                                                !v$.actual_model.char_jewel.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelJewelQuantity" label="Jewel Quantity"
                                            :error="v$.actual_model.char_jewel_quantity.$dirty && v$.actual_model.char_jewel_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.char_jewel_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.char_jewel_quantity"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.char_elemental_stone" 
                                            :items="ascension_materials"
                                            label="Elemental Stone"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.char_elemental_stone.$dirty && v$.actual_model.char_elemental_stone.$error"
                                            :rules="[
                                                !v$.actual_model.char_elemental_stone.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelElementalStoneQuantity" label="Elemental Stone Quantity"
                                            :error="v$.actual_model.char_elemental_stone_quantity.$dirty && v$.actual_model.char_elemental_stone_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.char_elemental_stone_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.char_elemental_stone_quantity"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.char_local_material" 
                                            :items="ascension_materials"
                                            label="Local Material"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.char_local_material.$dirty && v$.actual_model.char_local_material.$error"
                                            :rules="[
                                                !v$.actual_model.char_local_material.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelLocalMaterialQuantity" label="Local Material Quantity"
                                            :error="v$.actual_model.char_local_material_quantity.$dirty && v$.actual_model.char_local_material_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.char_local_material_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.char_local_material_quantity"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.char_common_item" 
                                            :items="ascension_materials"
                                            label="Common Item"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.char_common_item.$dirty && v$.actual_model.char_common_item.$error"
                                            :rules="[
                                                !v$.actual_model.char_common_item.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelCommonItemQuantity" label="Common Item Quantity"
                                            :error="v$.actual_model.char_common_item_quantity.$dirty && v$.actual_model.char_common_item_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.char_common_item_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.char_common_item_quantity"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field ref="actualModelMoraQuantity" label="Mora Quantity"
                                            :error="v$.actual_model.mora_quantity.$dirty && v$.actual_model.mora_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.mora_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.mora_quantity"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
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
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, PropType, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { Character } from '@/models/Character'
import { Stat as CharacterStat } from '@/models/Character/Stat'
import { useCharacterStatsStore } from '@/stores/characters/stats'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { StatType } from '@/models/StatType'
import { AscensionMaterial } from '@/models/AscensionMaterial'
import Combobox from '@/components/inputs/Combobox.vue'
import DataTable from '@/components/DataTable.vue'
import MaterialQuantityDisplayer from '@/components/miscellaneous/MaterialQuantityDisplayer.vue'
import MoraQuantityDisplayer from '@/components/miscellaneous/MoraQuantityDisplayer.vue'

const props = defineProps({
    modelValue: { type: Object as PropType<Character>, default: null },
})
const emit = defineEmits(['update:modelValue'])
const store$ = useCharacterStatsStore()

let stat_types: Ref<Array<StatType>> = computed(() => {
    return store$.stat_types
})
let ascension_materials: Ref<Array<AscensionMaterial>> = computed(() => {
    return store$.ascension_materials
})

let levels = [
    { level: '1', char_jewel_rarity: 2, char_jewel_quantity: 0, char_elemental_stone_quantity: 0, char_local_material_quantity: 0, char_common_item_rarity: 1, char_common_item_quantity: 0, mora_quantity: 0 },
    { level: '20', char_jewel_rarity: 2, char_jewel_quantity: 0, char_elemental_stone_quantity: 0, char_local_material_quantity: 0, char_common_item_rarity: 1, char_common_item_quantity: 0, mora_quantity: 0 },
    { level: '20+', char_jewel_rarity: 2, char_jewel_quantity: 1, char_elemental_stone_quantity: 0, char_local_material_quantity: 3, char_common_item_rarity: 1, char_common_item_quantity: 3, mora_quantity: 20000 },
    { level: '40', char_jewel_rarity: 3, char_jewel_quantity: 0, char_elemental_stone_quantity: 0, char_local_material_quantity: 0, char_common_item_rarity: 1, char_common_item_quantity: 0, mora_quantity: 0 },
    { level: '40+', char_jewel_rarity: 3, char_jewel_quantity: 3, char_elemental_stone_quantity: 2, char_local_material_quantity: 10, char_common_item_rarity: 1, char_common_item_quantity: 15, mora_quantity: 40000 },
    { level: '50', char_jewel_rarity: 3, char_jewel_quantity: 0, char_elemental_stone_quantity: 0, char_local_material_quantity: 0, char_common_item_rarity: 2, char_common_item_quantity: 0, mora_quantity: 0 },
    { level: '50+', char_jewel_rarity: 3, char_jewel_quantity: 6, char_elemental_stone_quantity: 4, char_local_material_quantity: 20, char_common_item_rarity: 2, char_common_item_quantity: 12, mora_quantity: 60000 },
    { level: '60', char_jewel_rarity: 4, char_jewel_quantity: 0, char_elemental_stone_quantity: 0, char_local_material_quantity: 0, char_common_item_rarity: 2, char_common_item_quantity: 0, mora_quantity: 0 },
    { level: '60+', char_jewel_rarity: 4, char_jewel_quantity: 3, char_elemental_stone_quantity: 8, char_local_material_quantity: 30, char_common_item_rarity: 2, char_common_item_quantity: 18, mora_quantity: 80000 },
    { level: '70', char_jewel_rarity: 4, char_jewel_quantity: 0, char_elemental_stone_quantity: 0, char_local_material_quantity: 0, char_common_item_rarity: 3, char_common_item_quantity: 0, mora_quantity: 0 },
    { level: '70+', char_jewel_rarity: 4, char_jewel_quantity: 6, char_elemental_stone_quantity: 12, char_local_material_quantity: 45, char_common_item_rarity: 3, char_common_item_quantity: 12, mora_quantity: 100000 },
    { level: '80', char_jewel_rarity: 5, char_jewel_quantity: 0, char_elemental_stone_quantity: 0, char_local_material_quantity: 0, char_common_item_rarity: 3, char_common_item_quantity: 0, mora_quantity: 0 },
    { level: '80+', char_jewel_rarity: 5, char_jewel_quantity: 6, char_elemental_stone_quantity: 20, char_local_material_quantity: 60, char_common_item_rarity: 3, char_common_item_quantity: 24, mora_quantity: 120000 },
    { level: '90', char_jewel_rarity: 5, char_jewel_quantity: 0, char_elemental_stone_quantity: 0, char_local_material_quantity: 0, char_common_item_rarity: 3, char_common_item_quantity: 0, mora_quantity: 0 },
]

let loading = ref(false)
let form_dialog: Ref<boolean> = ref(false)
let actual_model: CharacterStat = reactive(new CharacterStat({}))
watch(() => actual_model.level, (newLevel) => {
    let selected_level = levels.find(level => level.level == newLevel)
    if(typeof selected_level !== 'undefined'){
        let char_jewel = ascension_materials.value.find(ascension_material => selected_level && ascension_material.rarity == selected_level.char_jewel_rarity && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Jewels'))
        if(char_jewel) actual_model.char_jewel = char_jewel
        actual_model.char_jewel_quantity = selected_level.char_jewel_quantity
        let char_local_material = ascension_materials.value.find(ascension_material => selected_level && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Local Materials'))
        if(char_local_material) actual_model.char_local_material = char_local_material
        actual_model.char_local_material_quantity = selected_level.char_local_material_quantity
        let char_elemental_stone = ascension_materials.value.find(ascension_material => selected_level && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Elemental Stones'))
        if(char_elemental_stone) actual_model.char_elemental_stone = char_elemental_stone
        actual_model.char_elemental_stone_quantity = selected_level.char_elemental_stone_quantity
        let char_common_item = ascension_materials.value.find(ascension_material => selected_level && ascension_material.rarity == selected_level.char_common_item_rarity && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Common Materials'))
        if(char_common_item) actual_model.char_common_item = char_common_item
        actual_model.char_common_item_quantity = selected_level.char_common_item_quantity
        actual_model.mora_quantity = selected_level.mora_quantity
    }
});

let setActualModel = function(element: any){
    v$.value.actual_model.$reset()
    actual_model.fill(element)
    loading.value = true
    store$.create(props.modelValue).then((response: any) => {
        loading.value = false
    })
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
            level: { required },
            hp: { required },
            atk: { required },
            def: { required },
            crit_rate: { required },
            crit_dmg: { required },
            variable_stat: { required },
            variable_stat_value: { required },
            char_jewel: { required },
            char_jewel_quantity: { required },
            char_elemental_stone: { required },
            char_elemental_stone_quantity: { required },
            char_local_material: { required },
            char_local_material_quantity: { required },
            char_common_item: { required },
            char_common_item_quantity: { required },
            mora_quantity: { required },
        }
    }
})
const v$ = useVuelidate(rules, { actual_model })

const handleFormSubmit = function(){

    v$.value.actual_model.$validate();

    if (!v$.value.actual_model.$error) {
        form_dialog.value = false
        loading.value = true
        if(actual_model.id == null){
            store$.store(props.modelValue, new CharacterStat(actual_model)).then((response: any) => {
                loading.value = false
                props.modelValue.character_stats.push(response)
            })
        } else {
            store$.update(props.modelValue, new CharacterStat(actual_model)).then((response: any) => {
                loading.value = false
                let actual_character_stat = props.modelValue.character_stats.find(character_stat => character_stat.id == actual_model.id)
                let index = actual_character_stat ? props.modelValue.character_stats.indexOf(actual_character_stat) : -1
                if(index > -1) props.modelValue.character_stats.splice(index, 1, actual_model)
            })
        }
    }
}

let headers: Array<any> = [
    { text: 'Level', value: 'level', sortable: true },
    { text: 'HP', value: 'hp', sortable: true },
    { text: 'Atk', value: 'atk', sortable: true },
    { text: 'Def', value: 'def', sortable: true },
    { text: 'CritRate', value: 'crit_rate', sortable: true },
    { text: 'CritDMG', value: 'crit_dmg', sortable: true },
    { text: 'Variable Stat', value: 'variable_stat', sortable: true },
    { text: 'Materials', value: 'materials', sortable: false },
    { text: 'Actions', value: 'actions', sortable: false, class: 'text-right' },
]

</script>