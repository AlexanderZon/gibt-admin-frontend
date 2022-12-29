import { defineStore } from "pinia"
import { SkillAscension as CharacterSkillAscension } from "@/models/Character/SkillAscension"
import { Character } from "@/models/Character"
import { AscensionMaterial } from "@/models/AscensionMaterial"

const base = 'characters'

export const useCharacterSkillsStore = defineStore('characters_skills', {
    state: () => ({
        $base_url: base,
        ascension_materials: [] as AscensionMaterial[],
        skill_ascension_materials: [] as AscensionMaterial[],
    }),
    actions: {
        async get() {
            //
        },
        async create(character: Character) {
            const response = await window.api.get(`${base}/${character.id}/skills/create`)
            this.fillFormData(response)
            return new CharacterSkillAscension(response.data.model)
        },
        async store(character: Character, skill: CharacterSkillAscension) {
            const response = await window.api.post(`${base}/${character.id}/skills`, skill)
            return new CharacterSkillAscension(response.data.data)
        },
        async edit(character: Character, skill: CharacterSkillAscension) {
            const response = await window.api.get(`${base}/${character.id}/skills/${skill.id}/edit`)
            this.fillFormData(response)
            return new CharacterSkillAscension(response.data.data)
        },
        async update(character: Character, skill: CharacterSkillAscension) {
            const response = await window.api.put(`${base}/${character.id}/skills/${skill.id}`, skill)
            return new CharacterSkillAscension(response.data.data)
        },
        async delete(character: Character, skill: CharacterSkillAscension) {
            const response = await window.api.delete(`${base}/${character.id}/skills/${skill.id}`)
            return new CharacterSkillAscension(response.data.data)
        },
        fillFormData(response: any){
            this.ascension_materials = response.data.form.ascension_materials.map((ascension_material: any) => {
                return new AscensionMaterial(ascension_material)
            })
            this.skill_ascension_materials = response.data.form.skill_ascension_materials.map((skill_ascension_material: any) => {
                return new AscensionMaterial(skill_ascension_material)
            })
        }
    },
})