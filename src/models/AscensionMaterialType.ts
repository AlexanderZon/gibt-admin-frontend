export class AscensionMaterialType {
    id: number;
    name: string;
    order: number;
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.name = data.name;
        this.order = data.order;
    }
}