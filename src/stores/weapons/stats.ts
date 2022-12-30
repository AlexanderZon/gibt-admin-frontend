import { defineStore } from "pinia"
import { Stat as WeaponStat } from "@/models/Weapon/Stat"
import { Weapon } from "@/models/Weapon"
import { AscensionMaterial } from "@/models/AscensionMaterial"
import { StatType } from "@/models/StatType"

const base = 'weapons'

export const useWeaponStatsStore = defineStore('weapons_stats', {
    state: () => ({
        $base_url: base,
        stat_types: [] as StatType[],
        ascension_materials: [] as AscensionMaterial[],
    }),
    actions: {
        async get() {
            //
        },
        async create(weapon: Weapon) {
            const response = await window.api.get(`${base}/${weapon.id}/stats/create`)
            this.fillFormData(response)
            return new WeaponStat(response.data.model)
        },
        async store(weapon: Weapon, stat: WeaponStat) {
            const response = await window.api.post(`${base}/${weapon.id}/stats`, stat)
            return new WeaponStat(response.data.data)
        },
        async edit(weapon: Weapon, stat: WeaponStat) {
            const response = await window.api.get(`${base}/${weapon.id}/stats/${stat.id}/edit`)
            this.fillFormData(response)
            return new WeaponStat(response.data.data)
        },
        async update(weapon: Weapon, stat: WeaponStat) {
            const response = await window.api.put(`${base}/${weapon.id}/stats/${stat.id}`, stat)
            return new WeaponStat(response.data.data)
        },
        async delete(weapon: Weapon, stat: WeaponStat) {
            const response = await window.api.delete(`${base}/${weapon.id}/stats/${stat.id}`)
            return new WeaponStat(response.data.data)
        },
        fillFormData(response: any){
            this.ascension_materials = response.data.form.ascension_materials.map((ascension_material: any) => {
                return new AscensionMaterial(ascension_material)
            })
            this.stat_types = response.data.form.stat_types.map((stat_type: any) => {
                return new StatType(stat_type)
            })
        }
    },
})