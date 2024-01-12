<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'

const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

</script>

<template>
    <Menu>
        <MenuButton as="div" class="absolute right-1 top-1 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-5 h-5 text-[#FD8709]">
                <path fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd" />
            </svg>
        </MenuButton>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-1 mt-2 w-[180px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div class="p-2 w-full">
                    <ul class="space-y-1.5">
                        <li v-for="item in props.data" :key="item.name" class="flex">
                            <span class="!text-[#227900] text-[12px] font-bold">{{ item.name }} : &nbsp;</span><span
                                class="!text-black text-[12px] font-bold">{{ item.jumlah }}&nbsp;({{ item.ratio
                                }}%)</span>
                        </li>
                    </ul>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>