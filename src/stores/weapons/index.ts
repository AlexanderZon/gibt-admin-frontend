import { defineStore } from "pinia"
import { Weapon } from '@/models/Weapon'
import { AscensionMaterial } from "@/models/AscensionMaterial"
import { WeaponType } from "@/models/WeaponType"

const base = 'weapons'

export const useWeaponsStore = defineStore('weapons', {
    state: () => ({
        $base_url: base,
        weapons: [] as Weapon[],
        weapon_types: [] as WeaponType[],
        ascension_materials: [] as AscensionMaterial[],
        stat_types: [] as AscensionMaterial[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.weapons = response.data.data.map((element: any) => {
                return new Weapon(element)
            })
            return this.weapons
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.fillFormData(response)
            return new Weapon(response.data.model)
        },
        async store(weapon: Weapon) {
            const response = await window.api.post(`${base}`, weapon)
            this.weapons.unshift(new Weapon(response.data.data))
        },
        async edit(weapon: Weapon) {
            const response = await window.api.get(`${base}/${weapon.id}/edit`)
            this.fillFormData(response)
            return new Weapon(response.data.model)
        },
        async update(weapon: Weapon) {
            const response = await window.api.put(`${base}/${weapon.id}`, weapon)
            this.updateStoreElement(new Weapon(response.data.data))
        },
        async delete(weapon: Weapon) {
            const response = await window.api.delete(`${base}/${weapon.id}`)
            this.deleteStoreElement(new Weapon(response.data.data))
        },
        async picture(weapon: Weapon, files: File[], type: string) {
            const response = await window.api.post(`${base}/${weapon.id}/picture?type=${type}`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return new Weapon(response.data.data)
        },
        updateStoreElement(weapon: Weapon) {
            let element:Weapon|undefined = this.weapons.find((element: Weapon) => {
                return (element.id == weapon.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.weapons.indexOf(element)
                if(index > -1) this.weapons.splice(index, 1, weapon)
            }
        },
        deleteStoreElement(weapon: Weapon) {
            let element:Weapon|undefined = this.weapons.find((element: Weapon) => {
                return (element.id == weapon.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.weapons.indexOf(element)
                if(index > -1) this.weapons.splice(index, 1)
            }
        },
        fillFormData(response: any){
            this.weapon_types = response.data.form.weapon_types.map((weapon_type: any) => {
                return new WeaponType(weapon_type)
            })
            this.ascension_materials = response.data.form.ascension_materials.map((ascension_material: any) => {
                return new AscensionMaterial(ascension_material)
            })
        }
    },
})