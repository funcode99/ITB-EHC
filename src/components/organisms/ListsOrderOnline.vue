<script setup>
import ListOrderOnline from '@/components/molecules/ListOrderOnline.vue'
import Api from '@/utils/Api';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment'
import router from '@/router';
import FilterSourceTab from '../molecules/FilterSourceTab.vue';

const store = useStore()
const nextPageUrl = ref(null)

const onScroll = async (e) => {
    let bottomOfWindow = Math.ceil(document.documentElement.scrollTop) + window.innerHeight === Math.ceil(document.documentElement.offsetHeight);

    if (bottomOfWindow && nextPageUrl.value) {
        await Api.get(nextPageUrl.value).then(response => {
            store.commit('appendLeadsLists', response.data.data.leads.data)
            nextPageUrl.value = response.data.data.leads.next_page_url
        });

        if (!nextPageUrl.value) {
            store.commit('isLoadingLeadsLists', false)
        }
    }
}

onMounted(() => {
    window.addEventListener('scroll', onScroll);
})

onBeforeMount(() => {
    fetch(true)
})

store.watch((state, getters) => [getters.startDate, getters.endDate], (newValue, oldValue) => {
    const params = {
        status: store.getters.checkedFilterStatus,
        cluster: store.getters.checkedFilterCluster,
        handle_by: store.getters.checkedFilterHandleBy,
        tag: store.getters.checkedFilterTags,
        source: store.getters.activeFilterTab
    }

    fetch(false, false, params)
})

store.watch((state, getters) => [getters.checkedFilterStatus, getters.checkedFilterCluster, getters.checkedFilterHandleBy, getters.checkedFilterTags], (newValue, oldValue) => {
    console.log(newValue[0])
    if (newValue[0] != null) {
        const params = {
            status: store.getters.checkedFilterStatus,
            cluster: store.getters.checkedFilterCluster,
            handle_by: store.getters.checkedFilterHandleBy,
            tag: store.getters.checkedFilterTags,
            source: store.getters.activeFilterTab
        }

        fetch(false, false, params)
    }
})

store.watch((state, getters) => getters.activeFilterTab, (newValue, oldValue) => {
    const params = {
        status: store.getters.checkedFilterStatus,
        cluster: store.getters.checkedFilterCluster,
        handle_by: store.getters.checkedFilterHandleBy,
        tag: store.getters.checkedFilterTags,
        source: store.getters.activeFilterTab
    }

    fetch(false, false, params)
})

store.watch((state, getters) => getters.searchLeads, (newValue, oldValue) => {
    fetch(false, false, {
        search: newValue
    })
})

store.subscribeAction({
    after: (action, state) => {
        // if (action.type === 'updateTagLeads' || action.type === 'updateFollowup') {
        // if (action.type === 'updateFollowup' || action.type === 'updateHandleBy') {
        if (action.type === 'updateHandleBy') {
            const params = {
                status: store.getters.checkedFilterStatus,
                cluster: store.getters.checkedFilterCluster,
                handle_by: store.getters.checkedFilterHandleBy,
                tag: store.getters.checkedFilterTags,
            }

            fetch(false, false, params)
        }
    }
})

const fetch = async (storeTags = false, appendLeadsLists = false, addonParams = {}) => {
    store.commit('isLoading', true);
    store.commit('isLoadingLeadsLists', true)

    try {
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
                // from_date: '2021-01-01',
                // to_date: '2022-11-12',
                limit: 6
            }, ...addonParams
        }

        // Set authorization for api
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const data = await Api.get('/home/leads', { params })

        if (appendLeadsLists) {
            store.commit('appendLeadsLists', data.data.data.leads.data)
        } else {
            store.commit('leadsLists', data.data.data.leads.data)
        }

        nextPageUrl.value = data.data.data.leads.next_page_url

        if (storeTags) {
            store.commit('tagsCancel', data.data.data.tags_cancel)
            store.commit('tagsNcsat', data.data.data.tags_ncsat)
            store.commit('handleByLists', data.data.data.ehc_list)

            if (data.data.data.handle_by === 'ACTIVE') {
                store.commit('canFilterHandleBy', true)
            } else {
                store.commit('canFilterHandleBy', false)
            }
        }

        if (!nextPageUrl.value) {
            store.commit('isLoadingLeadsLists', false)
        }

        store.commit('isLoading', false);
    } catch (err) {
        localStorage.clear()
        router.push('/login')
        store.commit('isLoading', false);
    }


}
</script>

<template>
    <FilterSourceTab />
    <ListOrderOnline v-for="list in store.getters.leadsLists" :key="list.id" :data="list" />
    <div v-if="!store.getters.leadsLists.length && !store.getters.isLoadingLeadsLists">
        <p class="text-center">Data Kosong</p>
    </div>
    <div v-show="store.getters.isLoadingLeadsLists" class="flex justify-center items-center">
        <svg class="animate-spin h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
    </div>
</template>