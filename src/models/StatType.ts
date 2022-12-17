export class StatType {
    id: number;
    name: string;
    code: string;
    order: number;
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.name = data.name;
        this.code = data.code;
        this.order = data.order;
    }
}