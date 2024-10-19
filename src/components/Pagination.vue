<template>
    <div :class="`flex justify-end gap-6 items-end h-full ${perPage === 15 ? 'mt-2' : ''}`">
        <v-select 
            variant="underlined"
            hide-details
            :items="[5, 10, 15]"
            :model-value="perPage"
            @update:model-value="(e) => emit('updatePerPage', e)"
            label="Элементов" 
            class="max-w-[150px]"
        >

        </v-select>
        <v-pagination
            @update:model-value="(e) => emit('updatePage', e)"
            rounded="circle"
            
            :total-visible="lastPage"
            :length="lastPage"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    page: number
    lastPage: number
    perPage: number
}>();
console.log(props.lastPage)

const emit = defineEmits(['updatePage', 'updatePerPage'])
</script>