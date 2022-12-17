import { defineStore } from "pinia"
import { Element } from '@/models/Element'

const base = 'elements'

export const useElementsStore = defineStore('elements', {
    state: () => ({
        $base_url: base,
        elements: [] as Element[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.elements = response.data.data.map((_element: any) => {
                return new Element(_element)
            })
            return this.elements
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.elements = response.data.data.map((_element: any) => {
                return new Element(_element)
            })
        },
        async store(element: Element) {
            const response = await window.api.post(`${base}`, element)
            this.elements.push(new Element(response.data.data))
        },
        async edit(element: Element) {

        },
        async update(element: Element) {
            const response = await window.api.put(`${base}/${element.id}`, element)
            this.udpateStoreElement(new Element(response.data.data))
        },
        async delete(element: Element) {
            const response = await window.api.delete(`${base}/${element.id}`, element)
            this.deleteStoreElement(new Element(response.data.data))
        },
        async picture(element: Element, files: File[]) {
            const response = await window.api.post(`${base}/${element.id}/picture`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.udpateStoreElement(new Element(response.data.data))
        },
        udpateStoreElement(element: Element) {
            let _element:Element|undefined = this.elements.find((_element: Element) => {
                return (_element.id == element.id)
            })
            if(typeof _element !== "undefined"){
                let index: number = this.elements.indexOf(_element)
                if(index > -1) this.elements.splice(index, 1, element)
            }
        },
        deleteStoreElement(element: Element) {
            let _element:Element|undefined = this.elements.find((_element: Element) => {
                return (_element.id == element.id)
            })
            if(typeof _element !== "undefined"){
                let index: number = this.elements.indexOf(_element)
                if(index > -1) this.elements.splice(index, 1)
            }
        }
    },
})