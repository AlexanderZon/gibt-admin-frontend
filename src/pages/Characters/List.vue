<template>
    <div>
        <v-card>
            <v-toolbar>
                <!-- <template v-slot:prepend>
                <v-btn icon="$menu"></v-btn>
                </template> -->

                <v-toolbar-title class="text-h6">
                Characters
                </v-toolbar-title>

                <template v-slot:append>
                    <v-btn icon="mdi-plus"></v-btn>
                </template>
            </v-toolbar>
            <v-card-text>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Icon
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Rarity
                            </th>
                            <th class="text-left">
                                Weapon
                            </th>
                            <th class="text-left">
                                Element
                            </th>
                            <th class="text-left">
                                Ascension Materials
                            </th>
                            <th class="text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in characters" :key="item.name">
                            <td></td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.rarity }}</td>
                            <td>{{ item.weapon_type }}</td>
                            <td>{{ item.element }}</td>
                            <td>
                            </td>
                            <td class="text-right">
                                <v-btn color="amber" variant="plain" flat icon>
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn color="red" variant="plain" flat icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
    let characters = [
        {
            url: 'https://genshin.honeyhunterworld.com/img/ayaka_002_100.webp',
            name: 'Kamisato Ayaka',
            rarity: 5,
            weapon_type: 'sword',
            element: 'cryo',
            ascension_materials: [
                { url: 'https://genshin.honeyhunterworld.com/img/i_343_35.webp' },
                { url: 'https://genshin.honeyhunterworld.com/img/i_211_35.webp' },
                { url: 'https://genshin.honeyhunterworld.com/img/i_162_35.webp' },
                { url: 'https://genshin.honeyhunterworld.com/img/i_678_35.webp' },
                { url: 'https://genshin.honeyhunterworld.com/img/i_418_35.webp' },
                { url: 'https://genshin.honeyhunterworld.com/img/i_471_35.webp' },
            ]
        },
    ]
</script>