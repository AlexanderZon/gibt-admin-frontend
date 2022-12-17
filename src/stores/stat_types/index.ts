import { defineStore } from "pinia"
import { StatType } from '@/models/StatType'

const base = 'stat-types'

export const useStatTypesStore = defineStore('stat_types', {
    state: () => ({
        $base_url: base,
        stat_types: [] as StatType[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.stat_types = response.data.data.map((element: any) => {
                return new StatType(element)
            })
            return this.stat_types
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.stat_types = response.data.data.map((element: any) => {
                return new StatType(element)
            })
        },
        async store(stat_type: StatType) {
            const response = await window.api.post(`${base}`, stat_type)
            this.stat_types.push(new StatType(response.data.data))
        },
        async edit(stat_type: StatType) {

        },
        async update(stat_type: StatType) {
            const response = await window.api.put(`${base}/${stat_type.id}`, stat_type)
            this.udpateStoreElement(new StatType(response.data.data))
        },
        async delete(stat_type: StatType) {
            const response = await window.api.delete(`${base}/${stat_type.id}`, stat_type)
            this.deleteStoreElement(new StatType(response.data.data))
        },
        async picture(stat_type: StatType, files: File[]) {
            const response = await window.api.post(`${base}/${stat_type.id}/picture`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.udpateStoreElement(new StatType(response.data.data))
        },
        udpateStoreElement(stat_type: StatType) {
            let element:StatType|undefined = this.stat_types.find((element: StatType) => {
                return (element.id == stat_type.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.stat_types.indexOf(element)
                if(index > -1) this.stat_types.splice(index, 1, stat_type)
            }
        },
        deleteStoreElement(stat_type: StatType) {
            let element:StatType|undefined = this.stat_types.find((element: StatType) => {
                return (element.id == stat_type.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.stat_types.indexOf(element)
                if(index > -1) this.stat_types.splice(index, 1)
            }
        }
    },
})