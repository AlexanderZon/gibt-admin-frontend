import { defineStore } from "pinia"
import { Association } from '@/models/Association'

const base = 'associations'

export const useAssociationsStore = defineStore('associations', {
    state: () => ({
        $base_url: base,
        associations: [] as Association[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.associations = response.data.data.map((element: any) => {
                return new Association(element)
            })
            return this.associations
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.associations = response.data.data.map((element: any) => {
                return new Association(element)
            })
        },
        async store(association: Association) {
            const response = await window.api.post(`${base}`, association)
            this.associations.push(new Association(response.data.data))
        },
        async edit(association: Association) {

        },
        async update(association: Association) {
            const response = await window.api.put(`${base}/${association.id}`, association)
            this.udpateStoreElement(new Association(response.data.data))
        },
        async delete(association: Association) {
            const response = await window.api.delete(`${base}/${association.id}`, association)
            this.deleteStoreElement(new Association(response.data.data))
        },
        async picture(association: Association, files: File[]) {
            const response = await window.api.post(`${base}/${association.id}/picture`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.udpateStoreElement(new Association(response.data.data))
        },
        udpateStoreElement(association: Association) {
            let element:Association|undefined = this.associations.find((element: Association) => {
                return (element.id == association.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.associations.indexOf(element)
                if(index > -1) this.associations.splice(index, 1, association)
            }
        },
        deleteStoreElement(association: Association) {
            let element:Association|undefined = this.associations.find((element: Association) => {
                return (element.id == association.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.associations.indexOf(element)
                if(index > -1) this.associations.splice(index, 1)
            }
        }
    },
})