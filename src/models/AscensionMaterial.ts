import { AscensionMaterialType } from "./AscensionMaterialType";

export class AscensionMaterial {
    id: number;
    name: string;
    rarity: string;
    description: string;
    icon: string;
    order: number;
    ascension_material_types: Array<AscensionMaterialType>
    ascension_material_typeables: Array<number>
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.name = data.name;
        this.rarity = data.rarity;
        this.description = data.description;
        this.icon = data.icon;
        this.order = data.order;
        this.ascension_material_types = []
        this.ascension_material_typeables = []
        if(typeof data.ascension_material_types !== undefined && data.ascension_material_types != null){
            data.ascension_material_types.forEach((_ascenstion_material_type:any) => {
                let ascension_material_type = new AscensionMaterialType(_ascenstion_material_type)
                this.ascension_material_types.push(ascension_material_type)
                this.ascension_material_typeables.push(ascension_material_type.id)
            });
        }
    }
}