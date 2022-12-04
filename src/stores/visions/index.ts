import { defineStore } from "pinia"
import { Vision } from '@/models/Vision'

const base = 'visions'

export const useVisionsStore = defineStore('visions', {
    state: () => ({
        visions: [] as Vision[],
    }),
    actions: {
        async get() {
            const response = await window.api.get(`${base}`)
            this.visions = response.data.data.map((element: any) => {
                return new Vision(element)
            })
            return this.visions
        },
        async create() {
            const response = await window.api.get(`${base}/create`)
            this.visions = response.data.data.map((element: any) => {
                return new Vision(element)
            })
        },
        async store(vision: Vision) {
            const response = await window.api.post(`${base}`, vision)
            this.visions.push(new Vision(response.data.data))
        },
        async edit(vision: Vision) {

        },
        async update(vision: Vision) {

        },
        async delete(vision: Vision) {

        },
        async picture(vision: Vision, files: File[]) {
            const response = await window.api.post(`${base}/${vision.id}/picture`, { file: files[0] }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.updateVision(new Vision(response.data.data))
        },
        updateVision(vision: Vision) {
            let element:Vision|undefined = this.visions.find((element: Vision) => {
                return (element.id == vision.id)
            })
            if(typeof element !== "undefined"){
                let index: number = this.visions.indexOf(element)
                if(index > -1) this.visions.splice(index, 1, vision)
            }
            
        }
    },
})