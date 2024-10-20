<template>
    <v-text-field
        v-model="search"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
        class="mb-2"
        variant="outlined"
        @update:model-value="(e) => emit('search', e)"
        hide-details
        single-line
    />
    <v-table>
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key" class="cursor-pointer group" @click="enableSort(column.key)">
                    {{ column.name }}
                    <v-icon v-if="sort.name === column.key" :icon="`mdi-arrow-${sort.desc ? 'down' : 'up'}`" />
                    <v-icon v-else class="text-gray-400 opacity-0 group-hover:!opacity-50" icon="mdi-arrow-up" />
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
                        @click="() => {showDelete = true; deleteItem = row}"
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
    <v-dialog class="p-12" v-model="showDelete" width="auto">
        <v-card title="Подтвердите удаление" max-width="400">
            <template #actions>
                <v-btn @click="showDelete = false" color="error">
                    Отмена
                </v-btn>
                <v-btn @click="confirmDelete" color="success">
                    ОК
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from './Pagination.vue';
import { Sort } from '../types';
const props = defineProps<{
    columns: {key: string, name: string}[]
    rows: any[]
    page: number
    perPage: number
    lastPage: number
}>();

const search = ref();
const showDelete = ref(false);
const deleteItem = ref();

const sort = ref<Sort>({
    name: '',
    desc: true,
    clear: false
})

const confirmDelete = () => {
    emit('delete', deleteItem.value.id)
    showDelete.value = false
}

const enableSort = (name: string) => {
    if(sort.value.clear) {
        sort.value = {
            name: '',
            desc: true,
            clear: false
        }
        emit('sort', sort.value)
        return
    }
    const isEnabled = sort.value.name === name;
    const isDesc = isEnabled ? true : false;

    sort.value = {
        name,
        desc: isDesc,
        // if we enable sorting for 2 times, next tick will be clear sorting
        clear: isEnabled && isDesc
    }
    emit('sort', sort.value)
}

const emit = defineEmits(['updatePage', 'updatePerPage', 'edit', 'delete', 'search', 'sort']);

</script>