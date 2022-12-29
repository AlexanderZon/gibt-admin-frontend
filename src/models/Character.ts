import { AscensionMaterial } from "@/models/AscensionMaterial";
import { Element } from "@/models/Element";
import { Vision } from "@/models/Vision";
import { WeaponType } from "@/models/WeaponType";
import { Association } from "@/models/Association";
import { Stat as CharacterStat } from "@/models/Character/Stat";
import { SkillAscension as CharacterSkillAscension } from "@/models/Character/SkillAscension";

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
    released: boolean;
    ascension_materials: Array<AscensionMaterial>
    ascension_materialables: Array<number>
    skill_ascension_materials: Array<AscensionMaterial>
    skill_ascension_materialables: Array<number>
    character_stats: Array<CharacterStat>
    character_skill_ascensions: Array<CharacterSkillAscension>
    icon: string|null;
    side_icon: string|null;
    gacha_card: string|null;
    gacha_splash: string|null;
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

        // Skill Ascension Materials
        this.skill_ascension_materials = []
        this.skill_ascension_materialables = []
        if(typeof data.skill_ascension_materials !== undefined && data.skill_ascension_materials != null){
            data.skill_ascension_materials.forEach((_skill_ascension_material:any) => {
                let skill_ascension_material = new AscensionMaterial(_skill_ascension_material)
                this.skill_ascension_materials.push(skill_ascension_material)
                this.skill_ascension_materialables.push(skill_ascension_material.id)
            })
        }

        // Stats
        this.character_stats = []
        if(typeof data.character_stats !== undefined && data.character_stats != null){
            data.character_stats.forEach((_character_stat:any) => {
                let character_stat = new CharacterStat(_character_stat)
                this.character_stats.push(character_stat)
            })
        }

        // Skills
        this.character_skill_ascensions = []
        if(typeof data.character_skill_ascensions !== undefined && data.character_skill_ascensions != null){
            data.character_skill_ascensions.forEach((_character_skill_ascension:any) => {
                let character_skill_ascension = new CharacterSkillAscension(_character_skill_ascension)
                this.character_skill_ascensions.push(character_skill_ascension)
            })
        }
        
        // GALLERY
        // Icon
        if(typeof data.icon !== 'undefined' && data.icon != null) this.icon = data.icon
        else if(typeof data.character_icon !== 'undefined' && data.character_icon != null) this.icon = data.character_icon.url
        else this.icon = null
        // Side Icon
        if(typeof data.side_icon !== 'undefined' && data.side_icon != null) this.side_icon = data.side_icon
        else if(typeof data.character_side_icon !== 'undefined' && data.character_side_icon != null) this.side_icon = data.character_side_icon.url
        else this.side_icon = null
        // Gacha Card
        if(typeof data.gacha_card !== 'undefined' && data.gacha_card != null) this.gacha_card = data.gacha_card
        else if(typeof data.character_gacha_card !== 'undefined' && data.character_gacha_card != null) this.gacha_card = data.character_gacha_card.url
        else this.gacha_card = null
        // Gacha Splash
        if(typeof data.gacha_splash !== 'undefined' && data.gacha_splash != null) this.gacha_splash = data.gacha_splash
        else if(typeof data.character_gacha_splash !== 'undefined' && data.character_gacha_splash != null) this.gacha_splash = data.character_gacha_splash.url
        else this.gacha_splash = null
    }
}