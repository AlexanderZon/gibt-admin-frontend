import { defineStore } from "pinia"
import { WeaponType } from '@/models/WeaponType'

const base = 'weapon-types'

export const useWeaponTypesStore = defineStore('weapon_types', {
    state: () => ({
        $base_url: base,
        weapon_types: [] as WeaponType[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.weapon_types = response.data.data.map((element: any) => {
                return new WeaponType(element)
            })
            return this.weapon_types
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.weapon_types = response.data.data.map((element: any) => {
                return new WeaponType(element)
            })
        },
        async store(weapon_type: WeaponType) {
            const response = await window.api.post(`${base}`, weapon_type)
            this.weapon_types.push(new WeaponType(response.data.data))
        },
        async edit(weapon_type: WeaponType) {

        },
        async update(weapon_type: WeaponType) {
            const response = await window.api.put(`${base}/${weapon_type.id}`, weapon_type)
            this.updateStoreElement(new WeaponType(response.data.data))
        },
        async delete(weapon_type: WeaponType) {
            const response = await window.api.delete(`${base}/${weapon_type.id}`, weapon_type)
            this.deleteStoreElement(new WeaponType(response.data.data))
        },
        async picture(weapon_type: WeaponType, files: File[]) {
            const response = await window.api.post(`${base}/${weapon_type.id}/picture`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.updateStoreElement(new WeaponType(response.data.data))
        },
        updateStoreElement(weapon_type: WeaponType) {
            let element:WeaponType|undefined = this.weapon_types.find((element: WeaponType) => {
                return (element.id == weapon_type.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.weapon_types.indexOf(element)
                if(index > -1) this.weapon_types.splice(index, 1, weapon_type)
            }
        },
        deleteStoreElement(weapon_type: WeaponType) {
            let element:WeaponType|undefined = this.weapon_types.find((element: WeaponType) => {
                return (element.id == weapon_type.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.weapon_types.indexOf(element)
                if(index > -1) this.weapon_types.splice(index, 1)
            }
        }
    },
})