<script setup>
import Api from '@/utils/Api';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import router from '@/router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const toast = useToast();
const store = useStore()

const onLogout = async () => {
    store.commit('isLoading', true);

    const user = JSON.parse(localStorage.getItem('user'))

    const params = {
        email: user.email
    }

    await Api.post('/logout', params)

    localStorage.clear()

    toast.success('Sukses Logout', { position: 'top-center' })

    store.commit('isLoading', false);

    router.replace('/login')
}

</script>

<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton>
                <img src="@/assets/Profile.svg" alt="">
            </MenuButton>
        </div>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 mt-2 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div class="px-1 py-1">
                    <MenuItem>
                    <button type="button" @click="onLogout"
                        class="text-gray-900 flex w-full items-center justify-end rounded-md px-2 py-2 text-sm">
                        Logout
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>