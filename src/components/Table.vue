<template>
    <v-table>
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key">
                    {{ column.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row">
                <td v-for="item in columns">
                    <slot :name="item.key" :value="row[item.key]">
                        {{ row[item.key] }}
                    </slot>
                </td>
                
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
const props = defineProps<{
    columns: {key: string, name: string}[]
    rows: any[]
}>();
console.log(props.rows)
</script>