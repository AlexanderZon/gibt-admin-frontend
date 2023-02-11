<template>
    <v-combobox :model-value="modelValue"
        :items="items"
        :label="label"
        :item-title="itemTitle"
        :item-value="itemValue"
        @update:modelValue="input"
        multiple
        :clearable="clearable">
        <template v-slot:item="{ item }">
            <div v-if="!isSelected(item)"
                class="v-list-item v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line v-list-item--variant-text"
                tabindex="0"
                @click="select(item)">
                <span class="v-list-item__overlay"></span>
                <span class="v-list-item__underlay"></span>
                <div class="v-list-item__prepend"><!----><!---->
                    <div class="v-selection-control v-selection-control--inline v-selection-control--density-default v-checkbox-btn">
                        <div class="v-selection-control__wrapper"><!---->
                            <div class="v-selection-control__input">
                                <i class="mdi-checkbox-blank-outline mdi v-icon notranslate v-theme--light v-icon--size-default"
                                    aria-hidden="true"></i>
                                <input id="input-272"
                                    aria-readonly="false"
                                    type="checkbox"
                                    indeterminateicon="$checkboxIndeterminate"
                                    value="true"><!---->
                            </div>
                        </div><!---->
                    </div>
                </div>
                <div class="v-list-item__content"
                    data-no-activator="">
                    <div class="v-list-item-title">{{ item.title }}</div><!----><!---->
                </div>
                <div class="v-list-item__append"
                    v-if="itemIcon != null">
                    <v-lazy transition="fade-transition">
                        <v-img class="bg-white"
                            width="20"
                            :aspect-ratio="1"
                            :src="item.value[itemIcon]"
                            cover></v-img>
                    </v-lazy>
                </div>
            </div>
            <div v-else
                class="v-list-item v-list-item--active v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line v-list-item--variant-text"
                tabindex="0"
                @click="select(item)">
                <span class="v-list-item__overlay"></span>
                <span class="v-list-item__underlay"></span>
                <div class="v-list-item__prepend"><!----><!---->
                    <div class="v-selection-control v-selection-control--dirty v-selection-control--inline v-selection-control--density-default v-checkbox-btn">
                        <div class="v-selection-control__wrapper"><!---->
                            <div class="v-selection-control__input">
                                <i class="mdi-checkbox-marked mdi v-icon notranslate v-theme--light v-icon--size-default"
                                    aria-hidden="true"></i>
                                <input id="input-121"
                                    aria-readonly="false"
                                    type="checkbox"
                                    indeterminateicon="$checkboxIndeterminate"
                                    value="true"><!---->
                            </div>
                        </div><!---->
                    </div>
                </div>
                <div class="v-list-item__content"
                    data-no-activator="">
                    <div class="v-list-item-title">{{ item.title }}</div><!----><!---->
                </div>
                <div class="v-list-item__append"
                    v-if="itemIcon != null">
                    <v-lazy transition="fade-transition">
                        <v-img class="bg-white"
                            width="20"
                            :aspect-ratio="1"
                            :src="item.value[itemIcon]"
                            cover></v-img>
                    </v-lazy>
                </div>
            </div>
        </template>
    </v-combobox>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
const props = defineProps({
    modelValue: { type: Array, required: true },
    items: { type: Array, required: true },
    label: { type: String, default: '' },
    itemTitle: { type: String, default: 'title' },
    itemValue: { type: String, default: 'value' },
    itemIcon: { type: String as PropType<string | null>, default: null },
    clearable: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])
let input = function ($event: any) {
    emit('update:modelValue', $event)
}
let select = function (item: any) {
    if (isSelected(item)) {
        let element = props.modelValue.find(function (model_value: any) {
            return item.value[props.itemValue] == model_value[props.itemValue]
        })
        let index = props.modelValue.indexOf(element)
        let model = props.modelValue
        model.splice(index, 1)
        emit('update:modelValue', model)
    } else {
        let model = props.modelValue
        model.push(item.value)
        emit('update:modelValue', model)
    }
}
let isSelected = function (item: any) {
    return props.modelValue.some(function (model_value: any) {
        return item.value[props.itemValue] == model_value[props.itemValue]
    })
}
</script>