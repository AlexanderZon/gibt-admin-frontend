import { defineStore } from "pinia"
import { AscensionMaterial } from '@/models/AscensionMaterial'
import { AscensionMaterialType } from '@/models/AscensionMaterialType'

const base = 'ascension-materials'

export const useAscensionMaterialsStore = defineStore('ascension_materials', {
    state: () => ({
        $base_url: base,
        ascension_materials: [] as AscensionMaterial[],
        ascension_material_types: [] as AscensionMaterialType[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.ascension_materials = response.data.data.map((element: any) => {
                return new AscensionMaterial(element)
            })
            this.ascension_material_types = response.data.form.ascension_material_types.map((element: any) => {
                return new AscensionMaterialType(element)
            })
            return this.ascension_materials
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.ascension_materials = response.data.data.map((element: any) => {
                return new AscensionMaterial(element)
            })
        },
        async store(ascension_material: AscensionMaterial) {
            const response = await window.api.post(`${base}`, ascension_material)
            this.ascension_materials.unshift(new AscensionMaterial(response.data.data))
        },
        async edit(ascension_material: AscensionMaterial) {

        },
        async update(ascension_material: AscensionMaterial) {
            const response = await window.api.put(`${base}/${ascension_material.id}`, ascension_material)
            this.udpateStoreElement(new AscensionMaterial(response.data.data))
        },
        async delete(ascension_material: AscensionMaterial) {
            const response = await window.api.delete(`${base}/${ascension_material.id}`, ascension_material)
            this.deleteStoreElement(new AscensionMaterial(response.data.data))
        },
        async picture(ascension_material: AscensionMaterial, files: File[]) {
            const response = await window.api.post(`${base}/${ascension_material.id}/picture`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.udpateStoreElement(new AscensionMaterial(response.data.data))
        },
        udpateStoreElement(ascension_material: AscensionMaterial) {
            let element:AscensionMaterial|undefined = this.ascension_materials.find((element: AscensionMaterial) => {
                return (element.id == ascension_material.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.ascension_materials.indexOf(element)
                if(index > -1) this.ascension_materials.splice(index, 1, ascension_material)
            }
        },
        deleteStoreElement(ascension_material: AscensionMaterial) {
            let element:AscensionMaterial|undefined = this.ascension_materials.find((element: AscensionMaterial) => {
                return (element.id == ascension_material.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.ascension_materials.indexOf(element)
                if(index > -1) this.ascension_materials.splice(index, 1)
            }
        }
    },
})