<template >
        <v-dialog :model-value="modelValue" @update:modelValue="input" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">
                        <slot name="title">Confirm Delete?</slot>
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <slot name="content">Are you sure you want to delete this element?</slot>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey-darken-1" variant="text" @click="close">
                        <slot name="close-button-text">No, Close</slot>
                    </v-btn>
                    <v-btn color="red-darken-1" variant="text" @click="confirm">
                        <slot name="confirm-button-text">Yes, Delete</slot>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    const props = defineProps({
        modelValue: { type: Boolean, default: false },
    })
    const emit = defineEmits(['update:modelValue', 'confirm'])
    let dialog = ref(true)
    let close = function(){
        emit('update:modelValue', false)
    }
    let confirm = function(){
        emit('confirm')
    }
    let input = function($event: Boolean){
        emit('update:modelValue', $event)
    }
</script>