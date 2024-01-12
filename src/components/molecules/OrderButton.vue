<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Button from '@/components/atoms/Button.vue'
import { ref } from 'vue';
import Api from '@/utils/Api';
import { useStore } from 'vuex';

const props = defineProps({
    leads: {
        type: Object,
        default: {}
    },
    form: {
        type: Object,
        default: {}
    }
});

const store = useStore()
const name = ref(props.leads.nama)

const onSubmit = async () => {
    store.commit('isLoading', true);

    const age = props.form?.meta?.find(v => v.label == 'Usia')?.value
    const jenis_kelamin = props.form?.meta?.find(v => v.label == 'Jenis Kelamin')?.value

    const params = {
        nama_customer: name.value,
        age: age ?? null,
        jenis_kelamin: jenis_kelamin ?? null,
        email: props.form.email,
        handle_by: props.leads.handle_by,
        customer_telp: props.leads.customer_telp
    }

    const data = await Api.post('/leads/convert-leads-to-customer', params)

    store.commit('isLoading', false);

    if (props.leads.status_referral === 'VERIFIED') {
        window.open(`${process.env.VUE_APP_URL}/admin/order-quick/add?direct-oo=false&id-oo=false&id-customer-oo=${data.data.data.id_customer_oo}&nama-customer-oo=${data.data.data.nama_customer_oo}&telp-customer-oo=${data.data.data.telp_customer_oo}&age-oo=${age}&gender-oo=${jenis_kelamin}&alamat=${props.form.address}`, '_blank');
    } else {
        window.open(`${process.env.VUE_APP_URL}/admin/order-quick/add?direct-oo=true&id-oo=${props.leads.id}&id-customer-oo=${data.data.data.id_customer_oo}&nama-customer-oo=${data.data.data.nama_customer_oo}&telp-customer-oo=${data.data.data.telp_customer_oo}&age-oo=${age}&gender-oo=${jenis_kelamin}&alamat=${props.form.address}`, '_blank');
    }
}

</script>

<template>
    <Menu as="div" class="relative inline-block text-left">
        <MenuButton :as="Button" type="button" variant="warning">
            <img class="mr-[4px]" src="@/assets/cart.svg" alt="mail">
            <span class="text-[8px] !text-white">ORDER</span>
        </MenuButton>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-[10px] px-[8px]">
                <form @submit.prevent="onSubmit">
                    <div class="inline-flex items-center gap-[6px]">
                        <label for="name-order" class="text-[12px] text-[#227900] font-bold">Nama</label>
                        <input v-model="name" type="text" id="name-order"
                            class="transitions duration-300 block w-full px-[9px] py-[3px] text-[12px] text-gray-900 border bg-[#F0F0F0] rounded-[10px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[#D6D6D6]">
                    </div>
                    <MenuItem as="div" class="mt-[7px] text-right">
                    <Button type="submit" variant="warning"
                        class="py-[5px] px-[16px] text-[12px] rounded-full">ORDER</Button>
                    </MenuItem>
                </form>
            </MenuItems>
        </transition>
    </Menu>
</template>
