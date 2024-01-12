<script setup>
    import Navbar from '@/components/molecules/Navbar.vue'
    import DateRangePickerChat from '@/components/molecules/DateRangePickerChat.vue'
    import SearchInput from '@/components/molecules/SearchInput.vue'
    import ExportButton from '@/components/molecules/ExportButton.vue'
    import FilterButton from '@/components/molecules/FilterButton.vue'
    import { ref, onBeforeMount } from 'vue'
    import { useStore } from 'vuex'
    import Api from '@/utils/Api'

    const store = useStore()
    const data = ref()
    const date = ref()

    onBeforeMount(() => {
    fetch()
    })

    const fetch = async () => {
        
        const user = JSON.parse(localStorage.getItem('user'))
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const params = { 
        from_date: store.getters.startDateChat,
        to_date: store.getters.endDateChat
         }
        const api = await Api.get('/leads/chatbot-list', {params})
         data.value = api?.data.data
         console.log(api)
        console.log(data.value)
    }

    store.watch((state, getters) => [getters.startDateChat, getters.endDateChat], (newValue, oldValue) => {
    fetch(false, false)
    })

</script>

<template>
    <div class="py-[15px]">
        <Navbar />
        <DateRangePickerChat class="mx-[15px] my-[8px]" v-model="date" />

<!-- 
        <div class="mx-[15px]">
            <div class="grid gap-[8px]" :class="[store.getters.canFilterHandleBy ? 'grid-cols-4' : 'grid-cols-5']">
              <SearchInput :class="[store.getters.canFilterHandleBy ? 'col-span-2' : 'col-span-3']" />
              <ExportButton v-if="store.getters.canFilterHandleBy" class="col-span-1" />
              <FilterButton :class="[store.getters.canFilterHandleBy ? 'col-span-1' : 'col-span-2']" />
            </div>
      
        </div> -->



        <div class="chat-container pt-[20px] px-[15px]">

            <div v-for="(list, index) in data" :key="index">
                <router-link :to="`/conversation/${list.session_key}`">
                    <div class="chat-item flex gap-[5%] items-center py-[10px] px-[10px]">
        
                        <div class="profile-image">
                            <img src="@/assets/ProfileBig.svg" alt="">
                        </div>

                        <div class="text">
        
                            <div class="flex justify-between gap-[3%] items-center">
                                <div class="flex gap-[5%] w-full">
                                    <div class="contact-name text-[10px] font-black leading-[13px]">
                                        <!-- Febby Angelina -->
                                        {{ list?.name == null ? list?.receiver_number : list?.name }}
                                    </div>
                                    <div class="text-white text-[5px] font-bold text-center flex items-center px-[5px] rounded-[10px] bg-[#006DED]">
                                        <!-- Awareness -->
                                        {{ list?.cluster ?? '-' }}
                                    </div>
                                </div>
                                <div class="time text-[8px] w-[90px]">
                                    {{ list?.updated_at.slice(0,10) }}
                                </div>
                                <div class="text-[8px]">
                                    {{ list?.updated_at.slice(11,19) }}
                                </div>
                            </div>
        
                            <!-- <div class="contact-chat text-[8px] text-[#9f9f9f] flex gap-[2%]">
                                <div>
                                    <img src="@/assets/Check.svg" alt="">
                                </div>
                                <p>
                                    Bagaimana bu, untuk program sehatnya bisa saya rekomendasikan dengan ....
                                </p>
                            </div> -->
                        </div>
                    </div>
                </router-link>
            </div>

            <!-- <InfiniteLoading /> -->
        </div>
    </div>
</template>