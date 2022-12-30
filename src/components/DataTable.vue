<template>
    <div>
        <v-table class="data-table">
            <thead>
                <tr>
                    <th v-for="header in headers" class="data-table-th" :class="`${header.class ? header.class : ''} ${header.sortable ? 'sortable' : ''} ${sort_by_field == header.value ? 'active' : ''}`" @click="sortBy(header)">
                        {{ header.text }}
                        <template v-if="sort_by_field == header.value">
                            <v-icon v-if="is_descendant_sort">mdi-arrow-up</v-icon>
                            <v-icon v-else>mdi-arrow-down</v-icon>
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in visibleItems">
                    <td v-for="header in headers" :class="header.class">
                        <slot :name="`item.${header.value}`" v-bind="new PropItem(item)"></slot>
                    </td>
                </tr>
            </tbody>
        </v-table>
        
        <template v-if="!hideFooter">
            <slot :name="`pagination`" v-bind="{ page: page, length: paginationLength }">
                <v-pagination v-model="page" :length="paginationLength"></v-pagination>
            </slot>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import type { Ref,ComputedRef } from 'vue'
    import { PropType } from 'vue'
    import { Pagination } from '@/types/Pagination'

    class PropItem { 
        item: any
        constructor(prop_item: any){
            this.item = prop_item
        }
    }

    class Header {
        text: string
        value: string
        class: string | null
        filterable: boolean
        sortable: boolean
        constructor(header: any){
            this.text = header.text
            this.value = header.value
            this.class = null
            this.filterable = (typeof header.filterable !== 'undefined') ? header.filterable : true
            this.sortable = (typeof header.sortable !== 'undefined') ? header.sortable : true
        }
    }

    const props = defineProps({
        items: { type: Array, required: true },
        headers: { type: Array as PropType<Header[]> },
        search: { type: String, default: null },
        pagination: { type: Object as PropType<Pagination>, default: () => { return new Pagination({}) } },
        hideFooter: { type: Boolean, default: false }
    })

    let sort_by_field: Ref<string|null> = ref(null)
    let is_descendant_sort: Ref<boolean> = ref(false)

    const filteredItems = computed(() => {
        if(props.items.length > 0){
            return props.items.filter((item: any) => {
                if(props.search != null && item.name.toLocaleUpperCase().indexOf(props.search.toLocaleUpperCase()) == -1) return false
                return true
            }).sort((a: any,b: any) => {
                if(sort_by_field.value != null){
                    if(a[sort_by_field.value] > b[sort_by_field.value]) return is_descendant_sort.value ? 1 : -1
                    else if(a[sort_by_field.value] < b[sort_by_field.value]) return is_descendant_sort.value ? -1 : 1
                    else return 0
                } else {
                    return 0
                }
            })
        } else {
            return []
        }
    })

    let page: Ref<number> = ref(1)

    const visibleItems = computed(() => {
        let length = filteredItems.value.length
        if(props.pagination.itemsPerPage > 0){
            if(length >= page.value*props.pagination.itemsPerPage){
                return filteredItems.value.slice((page.value-1)*props.pagination.itemsPerPage, page.value*props.pagination.itemsPerPage)
            }
            else {
                return filteredItems.value.slice((page.value-1)*props.pagination.itemsPerPage, length)
            }
        } else {
            return filteredItems.value
        }
    })

    const paginationLength: ComputedRef<number> = computed(() => {
        let length = filteredItems.value.length
        if(props.pagination.itemsPerPage > 0){
            return Math.ceil(length/props.pagination.itemsPerPage)
        } else {
            return 1
        }
    })

    let sortBy = function(header: Header) {
        if(header.sortable){
            if(header.value == sort_by_field.value) is_descendant_sort.value = !is_descendant_sort.value
            sort_by_field.value = header.value
        }
    }

</script>

<style lang="css">
    .data-table thead tr th.sortable {
        cursor: pointer
    }
</style>