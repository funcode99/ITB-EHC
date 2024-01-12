<script setup>
import Item from '@/components/molecules/Item.vue';
import { onBeforeMount, ref } from 'vue'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useStore } from 'vuex';
import Api from '@/utils/Api';
import moment from 'moment'
import DashboardDetailButton from '@/components/molecules/DashboardDetailButton.vue';

const isCollapse = ref(true)

const dataDashboard = ref({})

const store = useStore()

store.watch((state, getters) => [getters.startDate, getters.endDate], (newValue, oldValue) => {
    fetch()
})

store.watch((state, getters) => [getters.checkedFilterStatus, getters.checkedFilterCluster, getters.checkedFilterHandleBy, getters.checkedFilterTags], (newValue, oldValue) => {
    const params = {
        handle_by: store.getters.checkedFilterHandleBy,
        source: store.getters.activeFilterTab
    }

    fetch(params)
})

store.watch((state, getters) => getters.activeFilterTab, (newValue, oldValue) => {
    const params = {
        status: store.getters.checkedFilterStatus,
        cluster: store.getters.checkedFilterCluster,
        handle_by: store.getters.checkedFilterHandleBy,
        tag: store.getters.checkedFilterTags,
        source: store.getters.activeFilterTab
    }

    fetch(params)
})

store.subscribeAction({
    after: (action, state) => {
        if (action.type === 'updateTagLeads') {
            fetch()
        }
    }
})

onBeforeMount(() => {
    fetch()

})

const fetch = async (addonParams = {}) => {
    store.commit('isLoading', true);

    const user = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))

    const fromDate = moment(store.getters.startDate).format('YYYY-MM-DD')
    const toDate = moment(store.getters.endDate).format('YYYY-MM-DD')

    const params = {
        ...{
            privillege_level: user.privillege_level,
            id: user.id,
            from_date: fromDate,
            to_date: toDate,
        }, ...addonParams
    }

    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const data = await Api.get('/home/dashboard', { params })

    dataDashboard.value = data.data.data

    store.commit('isLoading', false);
}

function toggle() {
    isCollapse.value = !isCollapse.value
}
</script>

<template>
    <div>
        <collapse-transition dimension="height">
            <div v-show="isCollapse">
                <div class="first grid grid-cols-2 gap-[11px] ">

                    <div class="item">
                        <span class="pt-[5px] pl-[7px] text-[12px] leading-[10px]">Leads Potential</span>
                        <span class="pl-[7px] text-[32px] leading-[43px] orange">{{
                            dataDashboard.leads_potential_total?.[0]
                        }}</span>

                        <span class="pb-[5px] pl-[7px] text-[8px]">({{
                            dataDashboard.leads_potential_total?.[1]
                        }}%)</span>
                        <img class="picture" src="@/assets/Total_Leads.svg" alt="">
                    </div>

                    <div class="item relative">
                        <span class="pt-[5px] pl-[7px] text-[12px] leading-[10px]">Non Closing</span>
                        <DashboardDetailButton :data="dataDashboard.leads_non_closing_details" />
                        <span class="pl-[7px] text-[32px] leading-[33px] orange">{{
                            dataDashboard.leads_non_closing_total?.[0]
                        }}</span>
                        <span class="pb-[5px] pl-[7px] text-[8px]">({{
                            dataDashboard.leads_non_closing_total?.[1]
                        }}%)</span>
                        <img class="picture" src="@/assets/person-minus.svg" alt="">
                    </div>

                </div>

                <div class="spacer"></div>

                <div class="second grid grid-cols-4 gap-[11px] ">

                    <Item status="Pending" :percentage="dataDashboard.pendings?.[1]"
                        :leadsdetail="dataDashboard.pendings?.[0]" image="bagtimer.svg" />
                    <Item status="Processing" :percentage="dataDashboard.processes?.[1]"
                        :leadsdetail="dataDashboard.processes?.[0]" image="bag2.svg" />
                    <div class="item relative">
                        <h1 class="pt-[5px] pl-[7px] text-[12px] leading-[10px]">Closing</h1>
                        <DashboardDetailButton :data="dataDashboard.closing_details" />
                        <h1 class="pl-[7px] text-[32px] leading-[33px] orange pt-[7px]">{{
                            dataDashboard.closings?.[0]
                        }}</h1>
                        <span class="pb-[5px] pl-[7px] text-[8px]">({{ dataDashboard.closings?.[1] }}%)</span>
                        <img class="picture" src="@/assets/bagtick2.svg" alt="">
                    </div>
                    <div class="item relative">
                        <h1 class="pt-[5px] pl-[7px] text-[12px] leading-[10px]">Cancel</h1>
                        <DashboardDetailButton :data="dataDashboard.cancel_details" />
                        <h1 class="pl-[7px] text-[32px] leading-[33px] orange pt-[7px]">{{
                            dataDashboard.cancel_total?.[0]
                        }}</h1>
                        <span class="pb-[5px] pl-[7px] text-[8px]">({{ dataDashboard.cancel_total?.[1] }}%)</span>
                        <img class="picture" src="@/assets/bagcross1.svg" alt="">
                    </div>

                </div>

                <div class="spacer"></div>

                <div class="third grid grid-cols-4  gap-[11px] ">

                    <Item status="Awareness" :percentage="dataDashboard.awarenesses?.[1]"
                        :leadsdetail="dataDashboard.awarenesses?.[0]" image="emojisad.svg" />
                    <Item status="Interest" :percentage="dataDashboard.interests?.[1]"
                        :leadsdetail="dataDashboard.interests?.[0]" image="emojinormal.svg" />
                    <Item status="Consideration" :percentage="dataDashboard.considerations?.[1]"
                        :leadsdetail="dataDashboard.considerations?.[0]" image="emojihappy.svg" />
                    <Item status="Referral" :leadsdetail="dataDashboard.referrals?.[0]" image="airdrop-icon.svg" />

                </div>
            </div>
        </collapse-transition>

        <div class="my-[12px] flex">
            <button type="button" class="mx-auto" @click="toggle">
                <img v-if="isCollapse" src="@/assets/chevron-up.svg" alt="">
                <img v-else src="@/assets/chevron-down.svg" alt="">
            </button>
        </div>
    </div>
</template>