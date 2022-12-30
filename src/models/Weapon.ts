import { AscensionMaterial } from "@/models/AscensionMaterial";
import { WeaponType } from "@/models/WeaponType";
import { StatType } from "@/models/StatType";
import { Stat as WeaponStat } from "@/models/Weapon/Stat";

export class Weapon {
    id: number;
    name: string;
    rarity: string;
    description: string;
    weapon_type: WeaponType|null;
    released: boolean;
    ascension_materials: Array<AscensionMaterial>
    ascension_materialables: Array<number>
    weapon_stats: Array<WeaponStat>
    icon: string|null;
    awakened_icon: string|null;
    gacha_card: string|null;
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.name = data.name
        this.rarity = data.rarity;
        this.description = data.description
        this.weapon_type = typeof data.weapon_type !== 'undefined' && data.weapon_type != null ? new WeaponType(data.weapon_type) : null
        this.released = typeof data.released !== 'undefined' ? data.released : false;

        // Ascension Materials
        this.ascension_materials = []
        this.ascension_materialables = []
        if(typeof data.ascension_materials !== undefined && data.ascension_materials != null){
            data.ascension_materials.forEach((_ascension_material:any) => {
                let ascension_material = new AscensionMaterial(_ascension_material)
                this.ascension_materials.push(ascension_material)
                this.ascension_materialables.push(ascension_material.id)
            })
        }

        // Stats
        this.weapon_stats = []
        if(typeof data.weapon_stats !== undefined && data.weapon_stats != null){
            data.weapon_stats.forEach((_weapon_stat:any) => {
                let weapon_stat = new WeaponStat(_weapon_stat)
                this.weapon_stats.push(weapon_stat)
            })
        }
        
        // GALLERY
        // Icon
        if(typeof data.icon !== 'undefined' && data.icon != null) this.icon = data.icon
        else if(typeof data.weapon_icon !== 'undefined' && data.weapon_icon != null) this.icon = data.weapon_icon.url
        else this.icon = null
        // Side Icon
        if(typeof data.awakened_icon !== 'undefined' && data.awakened_icon != null) this.awakened_icon = data.awakened_icon
        else if(typeof data.weapon_awakened_icon !== 'undefined' && data.weapon_awakened_icon != null) this.awakened_icon = data.weapon_awakened_icon.url
        else this.awakened_icon = null
        // Gacha Card
        if(typeof data.gacha_card !== 'undefined' && data.gacha_card != null) this.gacha_card = data.gacha_card
        else if(typeof data.weapon_gacha_card !== 'undefined' && data.weapon_gacha_card != null) this.gacha_card = data.weapon_gacha_card.url
        else this.gacha_card = null
    }
}