<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Button from '@/components/atoms/Button.vue'
import { useStore } from 'vuex';
import Api from '@/utils/Api';

const props = defineProps({
    value: {
        type: String,
        default: null
    },
    leadsId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    }
})

const store = useStore()

const onClick = async (tagId) => {
    store.commit('isLoading', true);

    const token = JSON.parse(localStorage.getItem('token'))

    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const params = {
        id: props.leadsId,
        value: tagId
    }

    await store.dispatch('updateTagLeads', params)

    store.commit('isLoading', false);
}

</script>

<template>
    <Menu as="div" class="relative">
        <MenuButton :as="Button" type="button" :variant="props.status == 'CANCEL' ? 'warning' : 'success'"
            class="w-full justify-between">
            <span class="text-[8px] !text-white">TAGS</span>
            <img class="ml-[4px]" src="@/assets/tags.svg" alt="tags">
        </MenuButton>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 mt-2 w-[120px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-[12px] z-10 overflow-hidden">
                <MenuItem v-for="tag in store.getters.tagsCancel" :key="tag.id" class="py-[4px] px-[8px] cursor-pointer"
                    @click="onClick(tag.id)">
                <div :class="[value == tag.name ? 'bg-[#FD8709] hover:bg-[#EB7E09]' : 'hover:bg-black/10']">{{
                    tag.name
                }}
                </div>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>