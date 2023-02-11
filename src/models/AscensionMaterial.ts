import { AscensionMaterialType } from "./AscensionMaterialType";

export type FarmingDayType = {
    text: string, 
    day: number
}

export let farming_days:Array<FarmingDayType> = [
    { text: 'Sunday', day: 1 },
    { text: 'Monday', day: 2 },
    { text: 'Tuesday', day: 3 },
    { text: 'Wednesday', day: 4 },
    { text: 'Thursday', day: 5 },
    { text: 'Friday', day: 6 },
    { text: 'Saturday', day: 7 },
]

export class AscensionMaterial {
    id: number;
    name: string;
    rarity: number;
    description: string;
    icon: string;
    order: number;
    ascension_material_types: Array<AscensionMaterialType>
    ascension_material_typeables: Array<number>
    ascension_material_farming_days: Array<FarmingDayType>
    ascension_material_farming_dayables: Array<number>
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
            })
        }
        this.ascension_material_farming_days = []
        this.ascension_material_farming_dayables = []
        if(typeof data.ascension_material_farming_days !== undefined && data.ascension_material_farming_days != null){
            data.ascension_material_farming_days.forEach((_ascension_material_farming_day:any) => {
                let farming_day = farming_days.find(farming_day => {
                    return farming_day.day == _ascension_material_farming_day.day
                })
                if(farming_day != null){
                    this.ascension_material_farming_days.push(farming_day)
                    this.ascension_material_farming_dayables.push(farming_day.day)
                }
            })
        }
    }
}