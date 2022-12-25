import { AscensionMaterial } from "./AscensionMaterial";
import { Element } from "./Element";
import { Vision } from "./Vision";
import { WeaponType } from "./WeaponType";
import { Association } from "./Association";

export class Character {
    id: number;
    name: string;
    title: string;
    occupation: string;
    rarity: string;
    description: string;
    constellation: string;
    day_of_birth: number;
    month_of_birth: number;
    element: Element|null;
    vision: Vision|null;
    association: Association|null;
    weapon_type: WeaponType|null;
    ascension_materials: Array<AscensionMaterial>
    ascension_materialables: Array<number>
    skill_ascension_materials: Array<AscensionMaterial>
    skill_ascension_materialables: Array<number>
    released: boolean;
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.name = data.name;
        this.title = data.title;
        this.occupation = data.occupation;
        this.rarity = data.rarity;
        this.description = data.description;
        this.constellation = data.constellation;
        this.day_of_birth = data.day_of_birth;
        this.month_of_birth = data.month_of_birth;
        this.element = typeof data.element !== 'undefined' && data.element != null ? new Element(data.element) : null
        this.vision = typeof data.vision !== 'undefined' && data.vision != null ? new Vision(data.vision) : null
        this.association = typeof data.association !== 'undefined' && data.association != null ? new Association(data.association) : null
        this.weapon_type = typeof data.weapon_type !== 'undefined' && data.weapon_type != null ? new WeaponType(data.weapon_type) : null
        this.ascension_materials = []
        this.ascension_materialables = []
        if(typeof data.ascension_materials !== undefined && data.ascension_materials != null){
            data.ascension_materials.forEach((_ascension_material:any) => {
                let ascension_material = new AscensionMaterial(_ascension_material)
                this.ascension_materials.push(ascension_material)
                this.ascension_materialables.push(ascension_material.id)
            })
        }
        this.skill_ascension_materials = []
        this.skill_ascension_materialables = []
        if(typeof data.skill_ascension_materials !== undefined && data.skill_ascension_materials != null){
            data.skill_ascension_materials.forEach((_skill_ascension_material:any) => {
                let skill_ascension_material = new AscensionMaterial(_skill_ascension_material)
                this.skill_ascension_materials.push(skill_ascension_material)
                this.skill_ascension_materialables.push(skill_ascension_material.id)
            })
        }
        this.released = typeof data.released !== 'undefined' ? data.released : false;
    }
}