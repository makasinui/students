<template>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        @update:model-value="(e) => emit('search', e)"
        hide-details
        single-line
      />
    <v-table>
        
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key">
                    {{ column.name }}
                </th>
                <th>
                    Действия
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.id">
                <td v-for="item in columns" :key="item.key">
                    <slot :name="item.key" :value="row[item.key]">
                        {{ row[item.key] }}
                    </slot>
                </td>
                <td>
                    <v-icon 
                        v-tooltip="'Редактировать'"
                        class="cursor-pointer"
                        icon="mdi-pencil"
                        @click="emit('edit', row.id)"
                    />
                    <v-icon 
                        v-tooltip="'Удалить'"
                        class="cursor-pointer ml-1"
                        icon="mdi-delete"
                        @click="emit('delete', row.id)"
                    />
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
import { ref } from 'vue';
import Pagination from './Pagination.vue';
const props = defineProps<{
    columns: {key: string, name: string}[]
    rows: any[]
    page: number
    perPage: number
    lastPage: number
}>();

const search = ref();

const emit = defineEmits(['updatePage', 'updatePerPage', 'edit', 'delete', 'search']);

</script>