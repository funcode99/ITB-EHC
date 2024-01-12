<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Button from '@/components/atoms/Button.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

const store = useStore()

const checkedStatus = ref([])
const checkedCluster = ref([])
const checkedHandleBy = ref([])
const checkedTags = ref([])
const statusOpen = ref(false)
const clusterOpen = ref(false)
const handleByOpen = ref(false)
const tagsOpen = ref(false)

store.watch((state, getters) => [getters.activeFilterTab, getters.searchLeads], (newValue, oldValue) => {
    checkedStatus.value = []
    checkedCluster.value = []
    checkedHandleBy.value = []
    checkedTags.value = []
})

const onSubmit = async () => {
    store.commit('checkedFilterStatus', checkedStatus.value)
    store.commit('checkedFilterCluster', checkedCluster.value)
    store.commit('checkedFilterHandleBy', checkedHandleBy.value)
    store.commit('checkedFilterTags', checkedTags.value)
}
</script>

<template>
    <Menu as="div" class="">
        <MenuButton
            class="inline-flex w-full items-center bg-white px-4 py-2 text-sm font-medium text-[#626262] hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-[10px]">
            <img class="w-[14px] h-[14px] mr-[6px]" src="@/assets/filter.svg" alt="filter">
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="ml-auto h-5 w-5 text-[#9F9F9F]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>

        </MenuButton>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-[12px] z-10">
                <form @submit.prevent="onSubmit">
                    <div class="grid gap-[14px]"
                        :class="[store.getters.canFilterHandleBy ? 'grid-cols-4' : 'grid-cols-3']">
                        <div>
                            <Button @click="statusOpen = !statusOpen" variant="success" type="button"
                                class="w-full rounded-full py-1 text-[8px] justify-between">
                                <span class="!text-white">STATUS</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-[15px] -mt-[2px]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                            <collapse-transition dimension="height">
                                <div v-show="statusOpen" class="mt-[11px] grid grid-cols-1 gap-[11px]">
                                    <div class="flex items-center">
                                        <input id="pending" type="checkbox" value="PENDING" v-model="checkedStatus"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2">
                                        <label for="pending"
                                            class="ml-2 text-[12px] font-medium text-gray-900">Pending</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="processing" type="checkbox" value="PROCESSING"
                                            v-model="checkedStatus"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2">
                                        <label for="processing"
                                            class="ml-2 text-[12px] font-medium text-gray-900">Processing</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="closing" type="checkbox" value="CLOSING" v-model="checkedStatus"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2">
                                        <label for="closing"
                                            class="ml-2 text-[12px] font-medium text-gray-900">Closing</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="cancel" type="checkbox" value="CANCEL" v-model="checkedStatus"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2">
                                        <label for="cancel"
                                            class="ml-2 text-[12px] font-medium text-gray-900">Cancel</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="nonclosing" type="checkbox" value="NON CLOSING"
                                            v-model="checkedStatus"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2">
                                        <label for="nonclosing" class="ml-2 text-[12px] font-medium text-gray-900">Non
                                            Closing</label>
                                    </div>
                                </div>
                            </collapse-transition>
                        </div>
                        <div>
                            <Button @click="clusterOpen = !clusterOpen" variant="success" type="button"
                                class="w-full rounded-full py-1 text-[8px] justify-between">
                                <span class="!text-white">CLUSTER</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-[15px] -mt-[2px]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                            <collapse-transition dimension="height">
                                <div v-show="clusterOpen" class="mt-[11px] grid grid-cols-1 gap-[11px]">
                                    <div class="flex items-center">
                                        <input id="awareness" type="checkbox" value="AWARENESS" v-model="checkedCluster"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2">
                                        <label for="awareness"
                                            class="ml-2 text-[12px] font-medium text-gray-900">Awareness</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="interest" type="checkbox" value="INTEREST" v-model="checkedCluster"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2">
                                        <label for="interest"
                                            class="ml-2 text-[12px] font-medium text-gray-900">Interest</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="consideration" type="checkbox" value="CONSIDERATION"
                                            v-model="checkedCluster"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2">
                                        <label for="consideration"
                                            class="ml-2 text-[12px] font-medium text-gray-900">Consideration</label>
                                    </div>
                                </div>
                            </collapse-transition>
                        </div>
                        <div v-if="store.getters.canFilterHandleBy">
                            <Button @click="handleByOpen = !handleByOpen" variant="success" type="button"
                                class="w-full rounded-full py-1 text-[8px] justify-between">
                                <span class="!text-white">HANDLE&nbsp;BY</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-[15px] -mt-[2px]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                            <collapse-transition dimension="height">
                                <div v-show="handleByOpen" class="mt-[11px] grid grid-cols-1 gap-[11px]">
                                    <div class="flex items-center" v-for="item in store.getters.handleByLists"
                                        :key="item.id">
                                        <input :id="item.id" type="checkbox" :value="item.name"
                                            v-model="checkedHandleBy"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2" />
                                        <label :for="item.id" class="ml-2 text-[12px] font-medium text-gray-900">{{
                                            item.name
                                        }}</label>
                                    </div>
                                </div>
                            </collapse-transition>
                        </div>
                        <div>
                            <Button @click="tagsOpen = !tagsOpen" variant="success" type="button"
                                class="w-full rounded-full py-1 text-[8px] justify-between">
                                <span class="!text-white">TAGS</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-[15px] -mt-[2px]">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                            <collapse-transition dimension="height">
                                <div v-show="tagsOpen" class="mt-[11px] grid grid-cols-1 gap-[11px]">
                                    <div class="flex items-center"
                                        v-for="tag in [...store.getters.tagsCancel, ...store.getters.tagsNcsat]"
                                        :key="tag.id">
                                        <input :id="tag.id" type="checkbox" :value="tag.id" v-model="checkedTags"
                                            class="w-4 h-4 text-[#227900] bg-gray-100 rounded border-gray-300 focus:ring-[#227900] focus:ring-2" />
                                        <label :for="tag.id" class="ml-2 text-[12px] font-medium text-gray-900">{{
                                            tag.name
                                        }}</label>
                                    </div>
                                </div>
                            </collapse-transition>

                            <MenuItem :as="Button" type="submit" variant="warning"
                                class="mt-[11px] w-full rounded-full py-1 text-[8px]">
                            APPLY
                            </MenuItem>
                        </div>
                    </div>
                </form>
            </MenuItems>
        </transition>
    </Menu>
</template>