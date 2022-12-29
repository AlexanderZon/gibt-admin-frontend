<template>
    <div>
        <v-card class="mt-4">
            <v-toolbar>
                <v-toolbar-title class="text-h6">
                    Character Skills
                </v-toolbar-title>
                <template v-slot:append>
                    <v-btn variant="plain" icon="mdi-plus" @click="showFormDialog({})"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <DataTable
                        :headers="headers"
                        :items="modelValue.character_skill_ascensions"
                        hide-footer>
                        <template #item.level="{ item }">
                            {{ item.level }}
                        </template>
                        <template #item.materials="{ item }">
                            <template v-if="item.talent_book_item_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.talent_book_item.icon" :quantity="item.talent_book_item_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.char_common_item_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.char_common_item.icon" :quantity="item.char_common_item_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.talent_boss_item_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.talent_boss_item.icon" :quantity="item.talent_boss_item_quantity"></MaterialQuantityDisplayer>
                            </template>
                            <template v-if="item.reward_item_quantity > 0">
                                <MaterialQuantityDisplayer :icon="item.reward_item.icon" :quantity="item.reward_item_quantity"></MaterialQuantityDisplayer>
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
                    <span class="text-h5">Character Skill Form</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <h3>Skills</h3>
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
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <h3>Materials</h3>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.talent_book_item" 
                                            :items="skill_ascension_materials"
                                            label="Jewel"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.talent_book_item.$dirty && v$.actual_model.talent_book_item.$error"
                                            :rules="[
                                                !v$.actual_model.talent_book_item.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelJewelQuantity" label="Jewel Quantity"
                                            :error="v$.actual_model.talent_book_item_quantity.$dirty && v$.actual_model.talent_book_item_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.talent_book_item_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.talent_book_item_quantity"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.reward_item" 
                                            :items="skill_ascension_materials"
                                            label="Elemental Stone"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.reward_item.$dirty && v$.actual_model.reward_item.$error"
                                            :rules="[
                                                !v$.actual_model.reward_item.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelElementalStoneQuantity" label="Elemental Stone Quantity"
                                            :error="v$.actual_model.reward_item_quantity.$dirty && v$.actual_model.reward_item_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.reward_item_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.reward_item_quantity"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <Combobox
                                            v-model="actual_model.talent_boss_item" 
                                            :items="skill_ascension_materials"
                                            label="Local Material"
                                            item-title="name"
                                            item-icon="icon"
                                            item-value="id"
                                            :error="v$.actual_model.talent_boss_item.$dirty && v$.actual_model.talent_boss_item.$error"
                                            :rules="[
                                                !v$.actual_model.talent_boss_item.required.$invalid || 'This field is required',
                                            ]"></Combobox>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field ref="actualModelLocalMaterialQuantity" label="Local Material Quantity"
                                            :error="v$.actual_model.talent_boss_item_quantity.$dirty && v$.actual_model.talent_boss_item_quantity.$error"
                                            :rules="[
                                                !v$.actual_model.talent_boss_item_quantity.required.$invalid || 'This field is required',
                                            ]"
                                            v-model="actual_model.talent_boss_item_quantity"></v-text-field>
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
import { SkillAscension as CharacterSkillAscension } from '@/models/Character/SkillAscension'
import { useCharacterSkillsStore } from '@/stores/characters/skills'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { AscensionMaterial } from '@/models/AscensionMaterial'
import Combobox from '@/components/inputs/Combobox.vue'
import DataTable from '@/components/DataTable.vue'
import MaterialQuantityDisplayer from '@/components/miscellaneous/MaterialQuantityDisplayer.vue'
import MoraQuantityDisplayer from '@/components/miscellaneous/MoraQuantityDisplayer.vue'

const props = defineProps({
    modelValue: { type: Object as PropType<Character>, default: null },
})
const emit = defineEmits(['update:modelValue'])
const store$ = useCharacterSkillsStore()

let skill_ascension_materials: Ref<Array<AscensionMaterial>> = computed(() => {
    return store$.skill_ascension_materials
})
let ascension_materials: Ref<Array<AscensionMaterial>> = computed(() => {
    return store$.ascension_materials
})

let levels = [
    { level: '2', talent_book_item_rarity: 2, talent_book_item_quantity: 3, reward_item_quantity: 0, talent_boss_item_quantity: 0, char_common_item_rarity: 1, char_common_item_quantity: 6, mora_quantity: 12500 },
    { level: '3', talent_book_item_rarity: 3, talent_book_item_quantity: 2, reward_item_quantity: 0, talent_boss_item_quantity: 0, char_common_item_rarity: 2, char_common_item_quantity: 3, mora_quantity: 17500 },
    { level: '4', talent_book_item_rarity: 3, talent_book_item_quantity: 4, reward_item_quantity: 0, talent_boss_item_quantity: 0, char_common_item_rarity: 2, char_common_item_quantity: 4, mora_quantity: 25000 },
    { level: '5', talent_book_item_rarity: 3, talent_book_item_quantity: 6, reward_item_quantity: 0, talent_boss_item_quantity: 0, char_common_item_rarity: 2, char_common_item_quantity: 6, mora_quantity: 30000 },
    { level: '6', talent_book_item_rarity: 3, talent_book_item_quantity: 9, reward_item_quantity: 0, talent_boss_item_quantity: 0, char_common_item_rarity: 2, char_common_item_quantity: 9, mora_quantity: 37500 },
    { level: '7', talent_book_item_rarity: 4, talent_book_item_quantity: 4, reward_item_quantity: 0, talent_boss_item_quantity: 1, char_common_item_rarity: 3, char_common_item_quantity: 4, mora_quantity: 120000 },
    { level: '8', talent_book_item_rarity: 4, talent_book_item_quantity: 6, reward_item_quantity: 0, talent_boss_item_quantity: 1, char_common_item_rarity: 3, char_common_item_quantity: 6, mora_quantity: 260000 },
    { level: '9', talent_book_item_rarity: 4, talent_book_item_quantity: 12, reward_item_quantity: 0, talent_boss_item_quantity: 2, char_common_item_rarity: 3, char_common_item_quantity: 9, mora_quantity: 450000 },
    { level: '10', talent_book_item_rarity: 4, talent_book_item_quantity: 16, reward_item_quantity: 1, talent_boss_item_quantity: 2, char_common_item_rarity: 3, char_common_item_quantity: 12, mora_quantity: 700000 },
]

let loading = ref(false)
let form_dialog: Ref<boolean> = ref(false)
let actual_model: CharacterSkillAscension = reactive(new CharacterSkillAscension({}))
watch(() => actual_model.level, (newLevel) => {
    let selected_level = levels.find(level => level.level == newLevel)
    if(typeof selected_level !== 'undefined'){
        let talent_book_item = skill_ascension_materials.value.find(ascension_material => selected_level && ascension_material.rarity == selected_level.talent_book_item_rarity && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Book Materials'))
        if(talent_book_item) actual_model.talent_book_item = talent_book_item
        actual_model.talent_book_item_quantity = selected_level.talent_book_item_quantity
        let talent_boss_item = skill_ascension_materials.value.find(ascension_material => selected_level && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Boss Materials'))
        if(talent_boss_item) actual_model.talent_boss_item = talent_boss_item
        actual_model.talent_boss_item_quantity = selected_level.talent_boss_item_quantity
        let reward_item = skill_ascension_materials.value.find(ascension_material => selected_level && ascension_material.ascension_material_types.some(ascension_material_type => ascension_material_type.name == 'Reward Materials'))
        if(reward_item) actual_model.reward_item = reward_item
        actual_model.reward_item_quantity = selected_level.reward_item_quantity
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
            variable_skill: { required },
            variable_skill_value: { required },
            talent_book_item: { required },
            talent_book_item_quantity: { required },
            reward_item: { required },
            reward_item_quantity: { required },
            talent_boss_item: { required },
            talent_boss_item_quantity: { required },
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
            store$.store(props.modelValue, new CharacterSkillAscension(actual_model)).then((response: any) => {
                loading.value = false
                props.modelValue.character_skill_ascensions.push(response)
            })
        } else {
            store$.update(props.modelValue, new CharacterSkillAscension(actual_model)).then((response: any) => {
                loading.value = false
                let actual_character_skill_ascension = props.modelValue.character_skill_ascensions.find(character_skill_ascension => character_skill_ascension.id == actual_model.id)
                let index = actual_character_skill_ascension ? props.modelValue.character_skill_ascensions.indexOf(actual_character_skill_ascension) : -1
                if(index > -1) props.modelValue.character_skill_ascensions.splice(index, 1, actual_model)
            })
        }
    }
}

let headers: Array<any> = [
    { text: 'Level', value: 'level', sortable: true },
    { text: 'Materials', value: 'materials', sortable: false },
    { text: 'Actions', value: 'actions', sortable: false, class: 'text-right' },
]

</script>