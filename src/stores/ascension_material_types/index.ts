import { defineStore } from "pinia"
import { AscensionMaterialType } from '@/models/AscensionMaterialType'

const base = 'ascension-material-types'

export const useAscensionMaterialTypesStore = defineStore('ascension_material_types', {
    state: () => ({
        $base_url: base,
        ascension_material_types: [] as AscensionMaterialType[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.ascension_material_types = response.data.data.map((element: any) => {
                return new AscensionMaterialType(element)
            })
            return this.ascension_material_types
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.ascension_material_types = response.data.data.map((element: any) => {
                return new AscensionMaterialType(element)
            })
        },
        async store(ascension_materia_type: AscensionMaterialType) {
            const response = await window.api.post(`${base}`, ascension_materia_type)
            this.ascension_material_types.push(new AscensionMaterialType(response.data.data))
        },
        async edit(ascension_materia_type: AscensionMaterialType) {

        },
        async update(ascension_materia_type: AscensionMaterialType) {
            const response = await window.api.put(`${base}/${ascension_materia_type.id}`, ascension_materia_type)
            this.updateStoreElement(new AscensionMaterialType(response.data.data))
        },
        async delete(ascension_materia_type: AscensionMaterialType) {
            const response = await window.api.delete(`${base}/${ascension_materia_type.id}`, ascension_materia_type)
            this.deleteStoreElement(new AscensionMaterialType(response.data.data))
        },
        async picture(ascension_materia_type: AscensionMaterialType, files: File[]) {
            const response = await window.api.post(`${base}/${ascension_materia_type.id}/picture`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.updateStoreElement(new AscensionMaterialType(response.data.data))
        },
        updateStoreElement(ascension_materia_type: AscensionMaterialType) {
            let element:AscensionMaterialType|undefined = this.ascension_material_types.find((element: AscensionMaterialType) => {
                return (element.id == ascension_materia_type.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.ascension_material_types.indexOf(element)
                if(index > -1) this.ascension_material_types.splice(index, 1, ascension_materia_type)
            }
        },
        deleteStoreElement(ascension_materia_type: AscensionMaterialType) {
            let element:AscensionMaterialType|undefined = this.ascension_material_types.find((element: AscensionMaterialType) => {
                return (element.id == ascension_materia_type.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.ascension_material_types.indexOf(element)
                if(index > -1) this.ascension_material_types.splice(index, 1)
            }
        }
    },
})