<template>
    <v-autocomplete
        :model-value="modelValue" 
        :items="items"
        :label="label"
        @update:modelValue="input"
        :multiple="multiple"
        :clearable="clearable"
        filter-mode="every"
        :custom-filter="customFilter"
        :filter-keys="['name']">
        <template v-slot:item="{ item }">
            <div v-if="!isSelected(item)" class="v-list-item v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line v-list-item--variant-text" tabindex="0" @click="select(item)" @keyup.enter="select(item)">
                <span class="v-list-item__overlay"></span>
                <span class="v-list-item__underlay"></span>
                <div class="v-list-item__prepend"><!----><!---->
                    <div class="v-selection-control v-selection-control--inline v-selection-control--density-default v-checkbox-btn" v-if="multiple">
                        <div class="v-selection-control__wrapper"><!---->
                            <div class="v-selection-control__input">
                                <i class="mdi-checkbox-blank-outline mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i>
                                <input id="input-272" aria-readonly="false" type="checkbox" indeterminateicon="$checkboxIndeterminate" value="true"><!---->
                            </div>
                        </div><!---->
                    </div>
                </div>
                <div class="v-list-item__content" data-no-activator="">
                    <div class="v-list-item-title">{{ item.value[itemTitle] }}</div><!----><!---->
                </div>
                <div class="v-list-item__append" v-if="itemIcon != null">
                    <v-lazy
                        transition="fade-transition">
                        <v-img width="35" :aspect-ratio="1" :src="item.value[itemIcon]"></v-img>
                    </v-lazy>
                </div>
            </div>
            <div v-else class="v-list-item v-list-item--active v-list-item--link v-theme--light v-list-item--density-default v-list-item--one-line v-list-item--variant-text" tabindex="0" @click="select(item)" @keyup.13="select(item)">
                <span class="v-list-item__overlay"></span>
                <span class="v-list-item__underlay"></span>
                <div class="v-list-item__prepend"><!----><!---->
                    <div class="v-selection-control v-selection-control--dirty v-selection-control--inline v-selection-control--density-default v-checkbox-btn" v-if="multiple">
                        <div class="v-selection-control__wrapper"><!---->
                            <div class="v-selection-control__input">
                                <i class="mdi-checkbox-marked mdi v-icon notranslate v-theme--light v-icon--size-default" aria-hidden="true"></i>
                                <input id="input-121" aria-readonly="false" type="checkbox" indeterminateicon="$checkboxIndeterminate" value="true"><!---->
                            </div>
                        </div><!---->
                    </div>
                </div>
                <div class="v-list-item__content" data-no-activator="">
                    <div class="v-list-item-title">{{ item.value[itemTitle] }}</div><!----><!---->
                </div>
                <div class="v-list-item__append" v-if="itemIcon != null">
                    <v-lazy
                        transition="fade-transition">
                        <v-img width="35" :aspect-ratio="1" :src="item.value[itemIcon]"></v-img>
                    </v-lazy>
                </div>
            </div>
        </template>
        <template v-slot:selection="data">
            <template v-if="multiple">
                <v-chip
                  class="ma-1"
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :model-value="data.selected"
                  :disabled="data.disabled"
                  size="small"
                  @click:close="data.parent.selectItem(data.item)"
                >
                  <template v-slot:prepend>
                    <v-avatar
                        v-if="itemIcon != null"
                        class="bg-accent text-uppercase"
                        start
                        size="35"
                        :image="data.item.value[itemIcon]">{{ data.item.title.slice(0, 1) }}</v-avatar>
                  </template>
                  {{ data.item.value[itemTitle] }}
                </v-chip>
            </template>
            <template v-else>
                <span class="autocomplete-selection-container">
                    <img v-if="itemIcon != null" class="mr-2 autocomplete-selection-image" :src="data.item.value[itemIcon]" width="35"/>
                    {{ data.item.value[itemTitle] }}
                </span>
            </template>
        </template>
        <template v-slot:label="data">
            {{ label }}
        </template>
    </v-autocomplete>
</template>

<script setup lang="ts">
    import { ref, PropType } from 'vue'
    import { FilterFunction } from '@/types/FilterFunction'
    
    const props = defineProps({
        modelValue: { type: Object as PropType<any>, default: null },
        items: { type: Array, required: true },
        label: { type: String, default: '' },
        itemTitle: { type: String, default: 'title' },
        itemValue: { type: String, default: 'value' },
        itemIcon: { type: String as PropType<string|null>, default: null },
        clearable: { type: Boolean, default: false },
        multiple: { type: Boolean, default: false },
        customFilter: { type: Function as PropType<FilterFunction>, default: undefined }
    })
    const emit = defineEmits(['update:modelValue'])
    let input = function($event: any){
        emit('update:modelValue', $event)
    }
    let select = function(item: any){
        if(typeof props.modelValue == 'object'){
            if(props.multiple){
                if(isSelected(item) && props.modelValue != null){
                    let element = props.modelValue.find(function(model_value: any){
                        return item.value[props.itemValue] == model_value[props.itemValue]
                    })
                    let index = props.modelValue.indexOf(element)
                    props.modelValue.splice(index, 1)
                } else {
                    if(props.modelValue == null) emit('update:modelValue', [item.value])
                    else props.modelValue.push(item.value)
                }
            } else {
                emit('update:modelValue', item.value)
            }
        } else {
            console.log('select else: ', typeof props.modelValue)
        }
    }
    let isSelected = function(item: any){
        if(props.multiple){
            if(props.modelValue != null && typeof props.modelValue === 'object' && typeof props.modelValue.some === 'function') {
                return props.modelValue.some(function(model_value: any){
                    return item.value[props.itemValue] == model_value[props.itemValue]
                })
            }
        } else {
            // Se hace de esta forma para evitar que el linter se queje props.modelValue[props.itemValue as keyof typeof props.modelValue]
            if(props.modelValue != null && typeof props.modelValue === 'object' && props.modelValue != null && typeof props.modelValue[props.itemValue as keyof typeof props.modelValue] !== 'undefined'){
                return props.modelValue[props.itemValue as keyof typeof props.modelValue] == item.value[props.itemValue]
            }
        }
    }
</script>

<style lang="css">
    .autocomplete-selection-container {
        display: flex
    }
    .autocomplete-selection-container > .autocomplete-selection-image {
        height: 35px;
        width: min-content;
    }
</style>