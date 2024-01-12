<script setup>
import Api from '@/utils/Api';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useStore } from 'vuex';

const props = defineProps({
    handleBy: String,
    orderId: String
})

const store = useStore()

const onClick = async (value) => {
    store.commit('isLoading', true);

    const token = JSON.parse(localStorage.getItem('token'))

    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const params = {
        id: props.orderId,
        value: value
    }

    await store.dispatch('updateHandleBy', params)

    store.commit('isLoading', false);
}

</script>

<template>
    <Menu as="div" class="relative">
        <MenuButton as="button" class="flex items-center gap-0.5">
            <img src="@/assets/person-square.svg" alt="">
            <span class="text-[12px] !text-[#227900]">{{ handleBy }}</span>
        </MenuButton>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute left-0 mt-2 w-[120px] origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-[12px] z-10 overflow-hidden">
                <div class="py-[4px] px-[8px] font-bold text-[14px] text-[#227900]">Handle By</div>
                <MenuItem v-for="item in store.getters.handleByLists" :key="item.id" class="py-[4px] px-[8px] cursor-pointer"
                    @click="onClick(item.id)">
                <div :class="[handleBy == item.name ? 'bg-[#FD8709] hover:bg-[#EB7E09]' : 'hover:bg-black/10']">{{ item.name
                }}
                </div>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>