export class Vision {
    id: number;
    icon: string;
    name: string;
    order: number;
    constructor(data: any) {
        this.id = data.id;
        this.icon = data.icon;
        this.name = data.name;
        this.order = data.order;
    }
}