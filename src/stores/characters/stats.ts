import { defineStore } from "pinia"
import { Stat as CharacterStat } from "@/models/Character/Stat"
import { Character } from "@/models/Character"
import { AscensionMaterial } from "@/models/AscensionMaterial"
import { StatType } from "@/models/StatType"

const base = 'characters'

export const useCharacterStatsStore = defineStore('characters_stats', {
    state: () => ({
        $base_url: base,
        stat_types: [] as StatType[],
        ascension_materials: [] as AscensionMaterial[],
    }),
    actions: {
        async get() {
            //
        },
        async create(character: Character) {
            const response = await window.api.get(`${base}/${character.id}/stats/create`)
            this.fillFormData(response)
            return new CharacterStat(response.data.model)
        },
        async store(character: Character, stat: CharacterStat) {
            const response = await window.api.post(`${base}/${character.id}/stats`, stat)
            return new CharacterStat(response.data.data)
        },
        async edit(character: Character, stat: CharacterStat) {
            const response = await window.api.get(`${base}/${character.id}/stats/${stat.id}/edit`)
            this.fillFormData(response)
            return new CharacterStat(response.data.data)
        },
        async update(character: Character, stat: CharacterStat) {
            const response = await window.api.put(`${base}/${character.id}/stats/${stat.id}`, stat)
            return new CharacterStat(response.data.data)
        },
        async delete(character: Character, stat: CharacterStat) {
            const response = await window.api.delete(`${base}/${character.id}/stats/${stat.id}`)
            return new CharacterStat(response.data.data)
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