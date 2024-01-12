<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const search = ref(null)

const onSearch = () => {
    store.commit('searchLeads', search.value)
}

</script>

<template>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-[#D6D6D6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>
        <input v-model="search" @search="onSearch" type="search" id="default-search"
            class="transitions duration-300 block w-full px-4 py-[8px] pl-10 text-sm text-gray-900 border bg-white rounded-[10px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[#D6D6D6]"
            placeholder="Search" required>
    </div>
</template>