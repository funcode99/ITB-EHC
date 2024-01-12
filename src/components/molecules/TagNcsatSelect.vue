<script setup>
import { ref, watch } from 'vue'
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { useStore } from 'vuex';

const store = useStore()

const emit = defineEmits(['response'])

const tags = [{ name: null }, ...store.getters.tagsNcsat]

const selectedTag = ref(tags[0])

watch(selectedTag, (newSelected) => {
    emit('response', newSelected)
})

</script>

<template>
    <div>
        <Listbox v-model="selectedTag">
            <div class="relative w-[133px]">
                <ListboxButton
                    class="relative w-full cursor-default rounded-[5px] bg-[#F0F0F0] py-[2px] pl-[5px] pr-[7px] text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span class="block truncate text-[12px]">{{ selectedTag.name ?? '-' }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-[9px] text-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="tag in tags" :key="tag.name" :value="tag"
                            as="template">
                            <li :class="[
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                                <span :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate text-[12px]',
                                ]">{{ tag.name ?? '-' }}</span>
                                <span v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>
  