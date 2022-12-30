import { Weapon } from "@/models/Weapon";
import { AscensionMaterial } from "@/models/AscensionMaterial";
import { StatType } from "@/models/StatType";

export class Stat {
    id: number;
    weapon: Weapon|null;
    level: string;
    atk: number;
    variable_stat: StatType|null;
    variable_stat_value: number;
    weap_primary_material: AscensionMaterial|null;
    weap_primary_material_quantity: number;
    weap_secondary_material: AscensionMaterial|null;
    weap_secondary_material_quantity: number;
    weap_common_item: AscensionMaterial|null;
    weap_common_item_quantity: number;
    mora_quantity: number;
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.level = data.level;
        this.atk = data.atk;
        this.weapon = typeof data.weapon !== 'undefined' && data.weapon != null ? new Weapon(data.weapon) : null
        this.variable_stat = typeof data.variable_stat !== 'undefined' && data.variable_stat != null ? new StatType(data.variable_stat) : null
        this.variable_stat_value = data.variable_stat_value;
        this.weap_primary_material = typeof data.weap_primary_material !== 'undefined' && data.weap_primary_material != null ? new AscensionMaterial(data.weap_primary_material) : null
        this.weap_primary_material_quantity = data.weap_primary_material_quantity;
        this.weap_secondary_material = typeof data.weap_secondary_material !== 'undefined' && data.weap_secondary_material != null ? new AscensionMaterial(data.weap_secondary_material) : null
        this.weap_secondary_material_quantity = data.weap_secondary_material_quantity;
        this.weap_common_item = typeof data.weap_common_item !== 'undefined' && data.weap_common_item != null ? new AscensionMaterial(data.weap_common_item) : null
        this.weap_common_item_quantity = data.weap_common_item_quantity;
        this.mora_quantity = data.mora_quantity;
    }
}