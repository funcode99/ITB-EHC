<script setup>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
} from '@headlessui/vue'
import TagNcsatSelect from '@/components/molecules/TagNcsatSelect.vue'
import Button from '@/components/atoms/Button.vue'
import Api from '@/utils/Api'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const props = defineProps({
    color: {
        type: String,
        default: ''
    },
    leads: {
        type: Object,
        default: {}
    },
    form: {
        type: Object,
        default: {}
    }
});

const toast = useToast();
const store = useStore()
const isOpen = ref(false)
const textpand = ref('')
const gender = ref(props.form?.meta?.find(v => v.label == 'Jenis Kelamin')?.value)
const tag = ref(null);

function closeModal() {
    isOpen.value = false
}
async function openModal() {
    store.commit('isLoading', true);
    const params = {
        type: 'ncsat',
        welcome_status: props.leads.welcome_status,
        followup_status: props.leads.followup_status,
        handle_by: props.leads.handle_by,
        nama: props.leads.nama,
        jenis_kelamin: gender.value,
        customer_telp: props.leads.customer_telp,
        id: props.leads.id
    }

    const data = await Api.get('/leads/get-message', { params })

    textpand.value = data.data.data

    store.commit('isLoading', false);
    isOpen.value = true
}

const onTagChange = async (tagNew) => {
    store.commit('isLoading', true);

    tag.value = tagNew.id

    const params = {
        type: 'ncsat',
        welcome_status: props.leads.welcome_status,
        followup_status: props.leads.followup_status,
        handle_by: props.leads.handle_by,
        nama: props.leads.nama,
        jenis_kelamin: tagNew.name,
        customer_telp: props.leads.customer_telp,
        id: props.leads.id
    }

    const data = await Api.get('/leads/get-message', { params })

    textpand.value = data.data.data

    store.commit('isLoading', false);
}

const onCopy = () => {
    navigator.clipboard.writeText(textpand.value);
    toast.success('Text Success Dicopy', { position: 'top-center', timeout: 1200 })
}

const onSubmit = async () => {
    store.commit('isLoading', true);

    const params = {
        id: props.leads.id,
        value: tag.value
    }

    const data = await Api.put('/leads/update-tag', params)

    store.commit('isLoading', false);

    const url = "https://wa.me/" + props.leads.customer_telp + "/?text=";
    window.open(encodeURI(url) + encodeURIComponent(textpand.value), '_blank');

    isOpen.value = false
}
</script>

<template>
    <Button type="button" @click="openModal" :variant="props.leads.status == 'NON CLOSING' ? 'warning' : 'success'">
        <span class="text-[8px] !text-white">NCSAT</span>
        <img class="ml-[4px]" src="@/assets/mail.svg" alt="mail">
    </Button>
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
                            class="w-full max-w-md transform rounded-md bg-white p-[12px] text-left align-middle shadow-xl transition-all">
                            <form @submit.prevent="onSubmit">
                                <div class="flex flex-col">
                                    <div class="inline-flex items-center">
                                        <span class="text-[12px] mr-[14px] text-[#227900] font-bold">TAGS</span>
                                        <TagNcsatSelect @response="onTagChange" />
                                    </div>
                                    <span class="text-[12px] text-[#FD8709] font-bold mt-[5px]">Name : {{
                                        props.leads.nama
                                    }}</span>
                                    <span class="text-[12px] text-[#FD8709] font-bold mt-[3px]">Phone Number : {{
                                        props.leads.customer_telp
                                    }}</span>
                                </div>
                                <div v-if="textpand != ''" class="flex flex-col">
                                    <label class="text-[12px] text-[#227900] font-bold my-[7px]">Text</label>
                                    <textarea class="bg-[#F0F0F0] text-[12px] rounded-[5px] py-[6px] px-[8px]"
                                        name="textpand" id="" rows="5">{{ textpand }}</textarea>
                                </div>
                                <div v-if="textpand != ''" class="flex justify-center gap-[10px] mt-[8px]">
                                    <Button @click="onCopy" class="rounded-full text-[12px] py-[5px] px-[16px]"
                                        type="button" variant="warning">
                                        COPY
                                    </Button>
                                    <Button class="rounded-full text-[12px] py-[5px] px-[16px]" type="submit"
                                        variant="success">
                                        SEND
                                    </Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
