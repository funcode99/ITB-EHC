<script setup>
import Navbar from '@/components/molecules/Navbar.vue'

import { ref, onBeforeMount } from 'vue'
import Api from '@/utils/Api'
import { useRoute } from 'vue-router';

const data = ref()
const response = ref()
const route = useRoute()

onBeforeMount(() => {
    fetch()
})

const fetch = async () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const api = await Api.get(`/leads/chatbot-list/${route.params.id}`)
    response.value = api?.data?.data[0].response
    data.value = api?.data?.data
    // console.log(api)
    // console.log(data.value)
}

async function directToWa(url) {
    window.open(url, '_blank', 'noreferrer')
}
</script>

<template>
    <div>
        <Navbar />

        <div v-for="(list, index) in data" :key="index"
            class=" chat-item flex gap-[5%] items-center bg-[#fff] mt-[11px] rounded-t-[10px] mx-[15px] py-[25px] px-[15px]">

            <div class="profile-image">
                <img src="@/assets/ProfileBig.svg" alt="">
            </div>

            <div class="text">
                <div class="flex flex-col justify-between items-center">
                    <div class="flex gap-[5%] w-full">
                        <div class="contact-name text-[10px] font-black leading-[13px] flex-1">
                            {{ list?.name }}
                        </div>

                        <div v-if="list?.cluster == 'AWARENESS'">
                            <div
                                class="text-white text-[5px] font-bold text-center flex items-center px-[5px] rounded-[10px] bg-[#006DED]">
                                {{ list?.cluster }}
                            </div>
                        </div>

                        <div v-else-if="list?.cluster == 'INTEREST'">
                            <div
                                class="text-white text-[5px] font-bold text-center flex items-center px-[5px] rounded-[10px] bg-[#FD8709]">
                                {{ list?.cluster }}
                            </div>
                        </div>

                        <div v-else-if="list?.cluster == 'CONSIDERATION'">
                            <div
                                class="text-white text-[5px] font-bold text-center flex items-center px-[5px] rounded-[10px] bg-[#37C200]">
                                {{ list?.cluster }}
                            </div>
                        </div>

                        <div v-else>
                            <div
                                class="text-white text-[5px] font-bold text-center flex items-center px-[5px] rounded-[10px] bg-[#37C200]">
                                {{ list?.cluster }}
                            </div>
                        </div>

                    </div>
                    <!-- <div class="time text-[8px]">
                        12:00
                    </div> -->
                </div>

                <div @click="directToWa(list?.receiver_number)"
                    class="contact-chat text-[8px] text-[#9f9f9f] flex gap-[2%]">
                    <p>+{{ list?.receiver_number }}</p>
                </div>

            </div>

        </div>

        <div class="max-w-[80%] border-2 border-[#f0f0f0]"></div>


        <div v-for="(list, index) in response" :key="index">


            <div class="chat-item flex gap-[3%] bg-[#fff] mx-[15px] justify-end items-center px-[15px] py-[10px]">

                <div class="text">
                    <div class="flex flex-col justify-between items-center">
                        <div class="flex gap-[5%] w-[90%]">
                            <div
                                class="contact-name text-[10px] bg-[#f0f0f0] px-[10px] py-[3px] rounded-[10px] font-black leading-[13px] flex-1 w-[90%]">
                                {{ list?.state?.message_text }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile-image">
                    <img src="@/assets/ITsMin.svg" alt="">
                </div>


            </div>

            <div v-if="list?.response != 0"
                class="chat-item flex gap-[3%] bg-[#fff] mx-[15px] items-center py-[10px] px-[15px]">

                <div class="profile-image">
                    <img src="@/assets/ProfileBig.svg" alt="">
                </div>

                <div class="text">
                    <div class="flex flex-col justify-between items-center">
                        <div class="flex gap-[5%] w-full">
                            <div
                                class="contact-name text-[10px] font-black leading-[13px] flex-1 bg-[#f0f0f0] px-[10px] py-[3px] rounded-[10px]">
                                {{ list?.response }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <!-- <div>
            <div class="flex gap-[5%] w-full text-right">
                <div class="contact-name text-[10px] font-black leading-[13px] flex-1">
                    {{ list?.response }}
                </div>
            </div>
        </div> -->

    </div>
</template>