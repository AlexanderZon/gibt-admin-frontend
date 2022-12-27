<template>
    <MaterialQuantityDisplayer :icon="icon" :quantity="displayed_quantity"></MaterialQuantityDisplayer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Ref,  } from 'vue'
import MaterialQuantityDisplayer from '@/components/miscellaneous/MaterialQuantityDisplayer.vue'

const icon = new URL('@/assets/images/mora.webp', import.meta.url).href

const props = defineProps({
    quantity: { type: [String, Number], default: null },
})
let displayed_quantity: Ref<string> = computed(() => {
    let quantity = typeof props.quantity === 'string' ? parseInt(props.quantity) : props.quantity
    if(quantity > 9999){
        return `${Math.floor(quantity/1000)}K`
    } else {
        return quantity.toString()
    }
})
</script>