export class Element {
    id: number;
    name: string;
    icon: string;
    order: number;
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.order = data.order;
    }
}