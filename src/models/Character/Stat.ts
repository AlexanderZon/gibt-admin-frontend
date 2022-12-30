import { Character } from "@/models/Character";
import { AscensionMaterial } from "@/models/AscensionMaterial";
import { StatType } from "@/models/StatType";

export class Stat {
    id: number;
    character: Character|null;
    level: string;
    hp: number;
    atk: number;
    def: number;
    crit_rate: number;
    crit_dmg: number;
    variable_stat: StatType|null;
    variable_stat_value: number;
    char_jewel: AscensionMaterial|null;
    char_jewel_quantity: number;
    char_elemental_stone: AscensionMaterial|null;
    char_elemental_stone_quantity: number;
    char_local_material: AscensionMaterial|null;
    char_local_material_quantity: number;
    char_common_item: AscensionMaterial|null;
    char_common_item_quantity: number;
    mora_quantity: number;
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.level = data.level;
        this.hp = data.hp;
        this.atk = data.atk;
        this.def = data.def;
        this.crit_rate = data.crit_rate;
        this.crit_dmg = data.crit_dmg;
        this.character = typeof data.character !== 'undefined' && data.character != null ? new Character(data.character) : null
        this.variable_stat = typeof data.variable_stat !== 'undefined' && data.variable_stat != null ? new StatType(data.variable_stat) : null
        this.variable_stat_value = data.variable_stat_value;
        this.char_jewel = typeof data.char_jewel !== 'undefined' && data.char_jewel != null ? new AscensionMaterial(data.char_jewel) : null
        this.char_jewel_quantity = data.char_jewel_quantity;
        this.char_elemental_stone = typeof data.char_elemental_stone !== 'undefined' && data.char_elemental_stone != null ? new AscensionMaterial(data.char_elemental_stone) : null
        this.char_elemental_stone_quantity = data.char_elemental_stone_quantity;
        this.char_local_material = typeof data.char_local_material !== 'undefined' && data.char_local_material != null ? new AscensionMaterial(data.char_local_material) : null
        this.char_local_material_quantity = data.char_local_material_quantity;
        this.char_common_item = typeof data.char_common_item !== 'undefined' && data.char_common_item != null ? new AscensionMaterial(data.char_common_item) : null
        this.char_common_item_quantity = data.char_common_item_quantity;
        this.mora_quantity = data.mora_quantity;
    }
}