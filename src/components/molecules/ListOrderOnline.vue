<script setup>
import Button from '@/components/atoms/Button.vue'
import NameButton from '@/components/molecules/NameButton.vue'
import UtmButton from '@/components/molecules/UtmButton.vue'
import TagButton from '@/components/molecules/TagButton.vue'
import FollowupButton from '@/components/molecules/FollowupButton.vue'
import OrderButton from '@/components/molecules/OrderButton.vue'
import HandleByButton from '@/components/molecules/HandleByButton.vue'
import NcsatButton from '@/components/molecules/NcsatButton.vue'
import ReferralButton from './ReferralButton.vue'
import { computed } from 'vue';
import { useStore } from 'vuex'

const props = defineProps({
    data: {
        type: Object,
        default: {},
    }
});

const formData = computed(() => JSON.parse(props.data.form_data))
const metaData = computed(() => JSON.parse(props.data.meta_data))

const store = useStore()

</script>

<template>
    <div>
        <div class="flex gap-[6px] items-center">
            <span v-if="!store.getters.canFilterHandleBy" class="text-[12px] !text-[#227900]">#{{ data.id }}</span>
            <HandleByButton v-else :handleBy="data.handle_by" :orderId="data.id" />
            <span
                :class="[data.cluster == 'AWARENESS' ? 'bg-[#006DED]' : data.cluster == 'INTEREST' ? 'bg-[#FD8709]' : data.cluster == 'CONSIDERATION' ? 'bg-[#37C200]' : 'bg-[#CCCCCC]']"
                class="py-1 px-3 text-[7px] !text-white rounded-full">{{ data.cluster ?? '-' }}</span>
            <span
                :class="[data.status == 'PROCESSING' ? 'bg-[#FAE52C]' : data.status == 'CLOSING' ? 'bg-[#37C200]' : 'bg-[#FD0909]']"
                class="py-1 px-3 text-[7px] rounded-full !text-white">{{ data.status }}</span>
            <span class="ml-auto text-[12px]">{{ data.created_at }}</span>
        </div>
        <div class="mt-[6px] flex justify-between items-center">
            <div class="flex flex-col gap-[4px]">

                <!-- <span class="text-[15px] !text-[#FD8709]">{{ data.nama }}</span> -->
                <NameButton :meta="metaData" :name="data?.nama" :sessionKey="data?.id" />
                <span class="text-[12px]">{{ data?.customer_telp }}</span>
                <span class="text-[12px]">{{ formData?.city }}</span>
                <div class="flex gap-[5px]">
                    <UtmButton :orderId="data.id" :utm="metaData" :form="formData" :handleBy="data?.handle_by" />
                    <OrderButton :leads="data" :form="formData" />
                    <ReferralButton :leads="data" :status="data?.status_referral" />
                </div>
            </div>
            <div class="flex gap-[7px]">
                <FollowupButton :color="data.welcome_status == 1 ? 'bg-[#37C200]' : 'bg-[#FAE52C]'" :leads="data"
                    :form="formData" :meta="metaData">W</FollowupButton>
                <FollowupButton
                    :color="data.welcome_status == 0 ? 'bg-[#CCCCCC]' : data.followup_status == 1 ? 'bg-[#37C200]' : data.followup_status == 2 ? 'bg-[#37C200]' : 'bg-[#FAE52C]'"
                    :leads="data" :form="formData" :meta="metaData">
                    1</FollowupButton>
                <FollowupButton
                    :color="data.welcome_status == 0 ? 'bg-[#CCCCCC]' : data.followup_status == 1 ? 'bg-[#FAE52C]' : data.followup_status == 2 ? 'bg-[#37C200]' : 'bg-[#CCCCCC]'"
                    :leads="data" :form="formData" :meta="metaData">
                    2</FollowupButton>
            </div>
            <div class="flex flex-col gap-[7px]">
                <TagButton :status="data.status" :value="data.tag_name" :leadsId="data.id" />
                <Button type="button" variant="success" class="justify-between">
                    <span class="text-[8px] !text-white">HLI</span>
                    <img class="ml-[4px]" src="@/assets/heartbeat.svg" alt="heartbeat">
                </Button>
                <NcsatButton :leads="data" />
            </div>
        </div>
    </div>
</template>