import { Character } from "@/models/Character";
import { AscensionMaterial } from "@/models/AscensionMaterial";

export class SkillAscension {
    id: number;
    character: Character|null;
    level: string;
    talent_book_item: AscensionMaterial|null;
    talent_book_item_quantity: number;
    talent_boss_item: AscensionMaterial|null;
    talent_boss_item_quantity: number;
    reward_item: AscensionMaterial|null;
    reward_item_quantity: number;
    char_common_item: AscensionMaterial|null;
    char_common_item_quantity: number;
    mora_quantity: number;
    constructor(data: any = {}) {
        this.fill(data)
    }
    fill(data: any = {}){
        this.id = data.id;
        this.level = data.level;
        this.character = typeof data.character !== 'undefined' && data.character != null ? new Character(data.character) : null
        this.talent_book_item = typeof data.talent_book_item !== 'undefined' && data.talent_book_item != null ? new AscensionMaterial(data.talent_book_item) : null
        this.talent_book_item_quantity = data.talent_book_item_quantity;
        this.talent_boss_item = typeof data.talent_boss_item !== 'undefined' && data.talent_boss_item != null ? new AscensionMaterial(data.talent_boss_item) : null
        this.talent_boss_item_quantity = data.talent_boss_item_quantity;
        this.reward_item = typeof data.reward_item !== 'undefined' && data.reward_item != null ? new AscensionMaterial(data.reward_item) : null
        this.reward_item_quantity = data.reward_item_quantity;
        this.char_common_item = typeof data.char_common_item !== 'undefined' && data.char_common_item != null ? new AscensionMaterial(data.char_common_item) : null
        this.char_common_item_quantity = data.char_common_item_quantity;
        this.mora_quantity = data.mora_quantity;
    }
}