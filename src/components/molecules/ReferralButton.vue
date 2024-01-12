<script setup>
import Api from '@/utils/Api';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle
} from '@headlessui/vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex';

const props = defineProps({
    leads: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: null
    }
})

const isOpen = ref(false)
const selectedItem = ref(null)
const status = ref(props.status)

const store = useStore()

const isReferral = computed(() => {
    return status.value !== null
        ? true
        : false
})

const items = [
    {
        name: 'Verifikasi',
        value: 'VERIFIED',
        alertMessage: 'Apakah Kamu Yakin Untuk <span class="text-green-700">Memverifikasi</span> Referral Ini?',
        alertBody: 'Referral Yang Sudah Diverifikasi Tidak Dapat Diubah.'

    },
    {
        name: 'Tidak Terverifikasi',
        value: 'NOT VERIFIED',
        alertMessage: 'Apakah Kamu Yakin Untuk <span class="text-red-700">Tidak Memverifikasi</span> Referral Ini?',
        alertBody: 'Referral Yang Sudah Tidak Diverifikasi Tidak Dapat Diubah.'
    }
]

const closeModal = () => {
    isOpen.value = false
}
const openModal = (value) => {
    selectedItem.value = value
    isOpen.value = true
}

const onSubmit = async () => {
    store.commit('isLoading', true);

    isOpen.value = false

    const token = JSON.parse(localStorage.getItem('token'))

    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const params = {
        id: props.leads.id,
        telp: props.leads.customer_telp,
        status: selectedItem.value.value
    }

    await store.dispatch('updateReferral', params)

    store.commit('isLoading', false);
}

</script>

<template>
    <Menu v-if="isReferral" as="div" class="relative">
        <div v-if="status === 'PENDING'">
            <MenuButton as="button" type="button"
                class="w-[31px] h-[31px] rounded-md inline-flex items-center justify-center p-[6px] bg-[#CCCCCC]">
                <span class="text-[11px] !text-white leading-tight font-bold">R</span>
            </MenuButton>
        </div>
        <div v-else-if="status === 'VERIFIED'">
            <div class="w-[31px] h-[31px] rounded-md inline-flex items-center justify-center p-[6px] bg-[#37C200]"
                disabled>
                <span class="text-[11px] !text-white leading-tight font-bold">R</span>
            </div>
        </div>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute left-0 mt-2 w-[120px] origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-[12px] z-10 overflow-hidden">
                <MenuItem class="py-[4px] px-[8px] cursor-pointer" v-for="(item, index) in items" :key="index"
                    @click="openModal(item)">
                <div>{{ item.name }}</div>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>

    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"
                                v-html="selectedItem.alertMessage">
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    {{ selectedItem.alertBody }}
                                </p>
                            </div>

                            <div class="mt-4 flex gap-2 justify-center">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Batal
                                </button>
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                    @click="onSubmit">
                                    Konfirmasi
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>