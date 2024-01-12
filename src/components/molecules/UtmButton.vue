<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import Button from '@/components/atoms/Button.vue'
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    orderId: {
        type: String,
        default: null
    },
    form: {
        type: Object,
        default: {}
    },
    utm: {
        type: Object,
        default: {},
    },
    handleBy: {
        type: String,
        default: '',
    }
});

const tujuanHidupSehat = computed(() => props.form?.meta?.find(v => v.label == 'Tujuan Sehat'))

const store = useStore()

</script>

<template>
    <Menu as="div" class="relative">
        <div>
            <MenuButton :as="Button" type="button" variant="success">
                <img src="@/assets/eye.svg" alt="detail">
            </MenuButton>
        </div>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute left-0 mt-2 w-[296px] origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-[12px] text-[12px] z-10">
                <ul>
                    <li v-if="store.getters.canFilterHandleBy"><span class="!text-[#227900] font-bold">ID Order :
                        </span>#{{
                            orderId
                        }}</li>
                    <li v-else><span class="!text-[#227900] font-bold">Handle By : </span>{{
                        handleBy
                    }}</li>
                    <li><span class="!text-[#227900] font-bold">UTM Source : </span>{{ utm.utm_source }}</li>
                    <li><span class="!text-[#227900] font-bold">UTM Medium : </span>{{ utm.utm_medium }}</li>
                    <li><span class="!text-[#227900] font-bold">UTM Campaign : </span>{{ utm.utm_campaign }}</li>
                    <li><span class="!text-[#227900] font-bold">UTM Content : </span>{{ utm.utm_content }}</li>
                    <li><span class="!text-[#227900] font-bold">Tujuan Sehat : </span>{{ tujuanHidupSehat?.value ?? '-'
                    }}</li>
                </ul>
            </MenuItems>
        </transition>
    </Menu>
</template>