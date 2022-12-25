import { defineStore } from "pinia"
import { Character } from '@/models/Character'
import { Element } from '@/models/Element'
import { Association } from "@/models/Association"
import { Vision } from "@/models/Vision"
import { AscensionMaterial } from "@/models/AscensionMaterial"
import { WeaponType } from "@/models/WeaponType"

const base = 'characters'

export const useCharactersStore = defineStore('characters', {
    state: () => ({
        $base_url: base,
        characters: [] as Character[],
        elements: [] as Element[],
        visions: [] as Vision[],
        associations: [] as Association[],
        weapon_types: [] as WeaponType[],
        ascension_materials: [] as AscensionMaterial[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.characters = response.data.data.map((element: any) => {
                return new Character(element)
            })
            return this.characters
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.fillFormData(response)
            return new Character(response.data.model)
        },
        async store(character: Character) {
            const response = await window.api.post(`${base}`, character)
            this.characters.unshift(new Character(response.data.data))
        },
        async edit(character: Character) {
            const response = await window.api.get(`${base}/${character.id}/edit`)
            this.fillFormData(response)
            return new Character(response.data.model)
        },
        async update(character: Character) {
            const response = await window.api.put(`${base}/${character.id}`, character)
            this.updateStoreElement(new Character(response.data.data))
        },
        async delete(character: Character) {
            const response = await window.api.delete(`${base}/${character.id}`, character)
            this.deleteStoreElement(new Character(response.data.data))
        },
        async picture(character: Character, files: File[]) {
            const response = await window.api.post(`${base}/${character.id}/picture`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.updateStoreElement(new Character(response.data.data))
        },
        updateStoreElement(character: Character) {
            let element:Character|undefined = this.characters.find((element: Character) => {
                return (element.id == character.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.characters.indexOf(element)
                if(index > -1) this.characters.splice(index, 1, character)
            }
        },
        deleteStoreElement(character: Character) {
            let element:Character|undefined = this.characters.find((element: Character) => {
                return (element.id == character.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.characters.indexOf(element)
                if(index > -1) this.characters.splice(index, 1)
            }
        },
        fillFormData(response: any){
            this.elements = response.data.form.elements.map((element: any) => {
                return new Element(element)
            })
            this.visions = response.data.form.visions.map((vision: any) => {
                return new Vision(vision)
            })
            this.weapon_types = response.data.form.weapon_types.map((weapon_type: any) => {
                return new WeaponType(weapon_type)
            })
            this.associations = response.data.form.associations.map((association: any) => {
                return new Association(association)
            })
            this.ascension_materials = response.data.form.ascension_materials.map((ascension_material: any) => {
                return new AscensionMaterial(ascension_material)
            })
        }
    },
})