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
    <Pagination 
        :page="page"
        :per-page="perPage"
        :last-page="lastPage"
        @update-page="(e: number) => emit('updatePage', e)"
        @update-per-page="(e: number) => emit('updatePerPage', e)"
    />
</template>

<script setup lang="ts">
import Pagination from './Pagination.vue';
const props = defineProps<{
    columns: {key: string, name: string}[]
    rows: any[]
    page: number
    perPage: number
    lastPage: number
}>();

const emit = defineEmits(['updatePage', 'updatePerPage']);
console.log(props.rows)
</script>