<template>
    <div>
        <v-card class="mt-4">
            <v-toolbar>
                <v-toolbar-title class="text-h6">
                    Weapon Stats
                </v-toolbar-title>
                <template v-slot:append>
                    <v-btn variant="plain" icon="mdi-plus" @click="showFormDialog({})"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <DataTable
                        :headers="headers"
                        :items="modelValue.weapon_stats"
                        hide-footer>
                        <template #item.level="{ item }">
                            {{ item.level }}
                        </template>
                        <template #item.atk="{ item }">
                            {{ item.atk }}
                        </template>
                        <template #item.variable_stat="{ item }">
                            {{ item.variable_stat_value }} {{ item.variable_stat.name }}
                        </template>
                        <template #item.materials="{ item }">
                            <template v-if="item.weap_primary_material_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.weap_primary_material.icon" :quantity="item.weap_primary_material_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.weap_secondary_material_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.weap_secondary_material.icon" :quantity="item.weap_secondary_material_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.char_local_material_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.char_local_material.icon" :quantity="item.char_local_material_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.weap_common_item_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.weap_common_item.icon" :quantity="item.weap_common_item_quantity"></MaterialQuantityDisplayer>
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
                    <span class="text-h5">Weapon Stat Form</span>
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
                                            :items="avalableLevels" 
                                            item-title="level"
                                            item-value="level"
                                            v-model="actual_model.level"></v-select>
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
                                            v-model="actual_model.weap_primary_material" 
                                            :items="ascension_materials"
                                            label="Jewel"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.weap_primary_material.$dirty && v$.actual_model.weap_primary_material.$error"
                                            :rules="[
                                                !v$.actual_model.weap_primary_material.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelJewelQuantity" label="Jewel Quantity"
                                            :error="v$.actual_model.weap_primary_material_quantity.$dirty && v$.actual_model.weap_primary_material_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.weap_primary_material_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.weap_primary_material_quantity"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.weap_secondary_material" 
                                            :items="ascension_materials"
                                            label="Elemental Stone"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.weap_secondary_material.$dirty && v$.actual_model.weap_secondary_material.$error"
                                            :rules="[
                                                !v$.actual_model.weap_secondary_material.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelElementalStoneQuantity" label="Elemental Stone Quantity"
                                            :error="v$.actual_model.weap_secondary_material_quantity.$dirty && v$.actual_model.weap_secondary_material_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.weap_secondary_material_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.weap_secondary_material_quantity"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.weap_common_item" 
                                            :items="ascension_materials"
                                            label="Common Item"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.weap_common_item.$dirty && v$.actual_model.weap_common_item.$error"
                                            :rules="[
                                                !v$.actual_model.weap_common_item.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelCommonItemQuantity" label="Common Item Quantity"
                                            :error="v$.actual_model.weap_common_item_quantity.$dirty && v$.actual_model.weap_common_item_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.weap_common_item_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.weap_common_item_quantity"></v-text-field>
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
import { Weapon } from '@/models/Weapon'
import { Stat as WeaponStat } from '@/models/Weapon/Stat'
import { useWeaponStatsStore } from '@/stores/weapons/stats'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { StatType } from '@/models/StatType'
import { AscensionMaterial } from '@/models/AscensionMaterial'
import Combobox from '@/components/inputs/Combobox.vue'
import DataTable from '@/components/DataTable.vue'
import MaterialQuantityDisplayer from '@/components/miscellaneous/MaterialQuantityDisplayer.vue'
import MoraQuantityDisplayer from '@/components/miscellaneous/MoraQuantityDisplayer.vue'

const props = defineProps({
    modelValue: { type: Object as PropType<Weapon>, default: null },
})
const emit = defineEmits(['update:modelValue'])
const store$ = useWeaponStatsStore()

let stat_types: Ref<Array<StatType>> = computed(() => {
    return store$.stat_types
})
let ascension_materials: Ref<Array<AscensionMaterial>> = computed(() => {
    return store$.ascension_materials
})

let levels_range_1 = [
    { level: '1', weap_primary_material_rarity: 2, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 1, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '20', weap_primary_material_rarity: 2, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 1, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '20+', weap_primary_material_rarity: 2, weap_primary_material_quantity: 1, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 1, weap_common_item_rarity: 1, weap_common_item_quantity: 1, mora_quantity: 0 },
    { level: '40', weap_primary_material_rarity: 3, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 1, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '40+', weap_primary_material_rarity: 3, weap_primary_material_quantity: 1, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 4, weap_common_item_rarity: 1, weap_common_item_quantity: 2, mora_quantity: 5000 },
    { level: '50', weap_primary_material_rarity: 3, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 2, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '50+', weap_primary_material_rarity: 3, weap_primary_material_quantity: 2, weap_secondary_material_rarity: 3, weap_secondary_material_quantity: 2, weap_common_item_rarity: 2, weap_common_item_quantity: 2, mora_quantity: 5000 },
    { level: '60', weap_primary_material_rarity: 4, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 3, weap_secondary_material_quantity: 0, weap_common_item_rarity: 2, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '60+', weap_primary_material_rarity: 4, weap_primary_material_quantity: 1, weap_secondary_material_rarity: 3, weap_secondary_material_quantity: 4, weap_common_item_rarity: 2, weap_common_item_quantity: 3, mora_quantity: 10000 },
    { level: '70', weap_primary_material_rarity: 4, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 4, weap_secondary_material_quantity: 0, weap_common_item_rarity: 3, weap_common_item_quantity: 0, mora_quantity: 0 },
]
let levels_range_5 = [
    { level: '1', weap_primary_material_rarity: 2, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 1, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '20', weap_primary_material_rarity: 2, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 1, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '20+', weap_primary_material_rarity: 2, weap_primary_material_quantity: 1, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 1, weap_common_item_quantity: 3, mora_quantity: 20000 },
    { level: '40', weap_primary_material_rarity: 3, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 1, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '40+', weap_primary_material_rarity: 3, weap_primary_material_quantity: 3, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 2, weap_common_item_rarity: 1, weap_common_item_quantity: 15, mora_quantity: 40000 },
    { level: '50', weap_primary_material_rarity: 3, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 2, weap_secondary_material_quantity: 0, weap_common_item_rarity: 2, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '50+', weap_primary_material_rarity: 3, weap_primary_material_quantity: 6, weap_secondary_material_rarity: 3, weap_secondary_material_quantity: 4, weap_common_item_rarity: 2, weap_common_item_quantity: 12, mora_quantity: 60000 },
    { level: '60', weap_primary_material_rarity: 4, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 3, weap_secondary_material_quantity: 0, weap_common_item_rarity: 2, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '60+', weap_primary_material_rarity: 4, weap_primary_material_quantity: 3, weap_secondary_material_rarity: 3, weap_secondary_material_quantity: 8, weap_common_item_rarity: 2, weap_common_item_quantity: 18, mora_quantity: 80000 },
    { level: '70', weap_primary_material_rarity: 4, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 4, weap_secondary_material_quantity: 0, weap_common_item_rarity: 3, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '70+', weap_primary_material_rarity: 4, weap_primary_material_quantity: 6, weap_secondary_material_rarity: 4, weap_secondary_material_quantity: 12, weap_common_item_rarity: 3, weap_common_item_quantity: 12, mora_quantity: 100000 },
    { level: '80', weap_primary_material_rarity: 5, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 4, weap_secondary_material_quantity: 0, weap_common_item_rarity: 3, weap_common_item_quantity: 0, mora_quantity: 0 },
    { level: '80+', weap_primary_material_rarity: 5, weap_primary_material_quantity: 6, weap_secondary_material_rarity: 4, weap_secondary_material_quantity: 20, weap_common_item_rarity: 3, weap_common_item_quantity: 24, mora_quantity: 120000 },
    { level: '90', weap_primary_material_rarity: 5, weap_primary_material_quantity: 0, weap_secondary_material_rarity: 4, weap_secondary_material_quantity: 0, weap_common_item_rarity: 3, weap_common_item_quantity: 0, mora_quantity: 0 },
]
let avalableLevels = computed(() => {
    if(props.modelValue.rarity == '1'){
        return levels_range_1
    } else {
        
        return levels_range_5
    }
})

let loading = ref(false)
let form_dialog: Ref<boolean> = ref(false)
let actual_model: WeaponStat = reactive(new WeaponStat({}))
watch(() => actual_model.level, (newLevel) => {
    let selected_level = avalableLevels.value.find(level => level.level == newLevel)
    if(typeof selected_level !== 'undefined'){
        let weap_primary_material = ascension_materials.value.find(ascension_material => selected_level && ascension_material.rarity == selected_level.weap_primary_material_rarity && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Weapon Ascension Materials (Primary)'))
        if(weap_primary_material) actual_model.weap_primary_material = weap_primary_material
        actual_model.weap_primary_material_quantity = selected_level.weap_primary_material_quantity
        let weap_secondary_material = ascension_materials.value.find(ascension_material => selected_level && ascension_material.rarity == selected_level.weap_secondary_material_rarity && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Weapon Ascension Materials (Secondary)'))
        if(weap_secondary_material) actual_model.weap_secondary_material = weap_secondary_material
        actual_model.weap_secondary_material_quantity = selected_level.weap_secondary_material_quantity
        let weap_common_item = ascension_materials.value.find(ascension_material => selected_level && ascension_material.rarity == selected_level.weap_common_item_rarity && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Common Materials'))
        if(weap_common_item) actual_model.weap_common_item = weap_common_item
        actual_model.weap_common_item_quantity = selected_level.weap_common_item_quantity
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
            atk: { required },
            variable_stat: { required },
            variable_stat_value: { required },
            weap_primary_material: { required },
            weap_primary_material_quantity: { required },
            weap_secondary_material: { required },
            weap_secondary_material_quantity: { required },
            weap_common_item: { required },
            weap_common_item_quantity: { required },
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
            store$.store(props.modelValue, new WeaponStat(actual_model)).then((response: any) => {
                loading.value = false
                props.modelValue.weapon_stats.push(response)
            })
        } else {
            store$.update(props.modelValue, new WeaponStat(actual_model)).then((response: any) => {
                loading.value = false
                let actual_weapon_stat = props.modelValue.weapon_stats.find(weapon_stat => weapon_stat.id == actual_model.id)
                let index = actual_weapon_stat ? props.modelValue.weapon_stats.indexOf(actual_weapon_stat) : -1
                if(index > -1) props.modelValue.weapon_stats.splice(index, 1, actual_model)
            })
        }
    }
}

let headers: Array<any> = [
    { text: 'Level', value: 'level', sortable: true },
    { text: 'Atk', value: 'atk', sortable: true },
    { text: 'Variable Stat', value: 'variable_stat', sortable: true },
    { text: 'Materials', value: 'materials', sortable: false },
    { text: 'Actions', value: 'actions', sortable: false, class: 'text-right' },
]

</script>