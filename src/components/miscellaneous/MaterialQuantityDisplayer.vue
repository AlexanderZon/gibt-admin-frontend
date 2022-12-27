<template>
    <div class="material-quantity-displayer">
        <img :src="icon"/>
        <span>{{ quantity }}</span>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    icon: { type: String, default: null },
    quantity: { type: [String, Number], default: null },
})
</script>

<style>
    .material-quantity-displayer{
        display: inline-block;
        width: 44px;
        height: 44px;
        text-align: center;
        padding: 2px;
        margin: 2px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        line-height: 40px;
        vertical-align: middle;
    }
    .material-quantity-displayer img{
        max-width: 40px;
        max-height: 40px;
        width: auto;
        height: auto;
        vertical-align: middle;
    }
    .material-quantity-displayer span{
        position: absolute;
        text-align: center;
        font-size: 13px;
        background: rgba(0, 0, 0, 0.85);
        width: calc(100% - 2px);
        left: 1px;
        bottom: 1px;
        border-radius: 5px;
        height: 16px;
        line-height: 15px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>