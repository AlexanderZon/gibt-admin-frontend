<template>
    <div>
        <v-table>
            <thead>
                <tr>
                    <th v-for="header in headers" :class="`${header.class}`" @click="sortBy(header.value)">
                        {{ header.text }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <slot v-for="header in headers" :name="`${header.value}`" v-bind="{ item: item }"></slot>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'

    class Header {
        text: string
        value: string
        class: string | null
        filterable: boolean
        sortable: boolean
        constructor(header: any){
            this.text = header.text
            this.value = header.value
            this.class = (typeof header.class !== 'undefined') ? header.class : null
            this.filterable = (typeof header.filterable !== 'undefined') ? header.filterable : null
            this.sortable = (typeof header.sortable !== 'undefined') ? header.sortable : null
        }
    }

    const props = defineProps({
        items: { type: Array, required: true },
        headers: { type: Array<Header> },
        search: { type: String, default: null },
    })

    let sort_by = ref(null)
    let descendant = ref(false)

    const filtered_items = computed(() => {
        if(props.items.length > 0){
            return props.items.filter((item: any) => {
                if(props.search != null && item.name.toLocaleUpperCase().indexOf(props.search.toLocaleUpperCase()) == -1) return false
                return true
            })
        } else {
            return []
        }
    })

</script>