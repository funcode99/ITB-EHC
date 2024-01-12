<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import Api from '@/utils/Api'
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
const props = defineProps({
    meta: {
        type: Object,
        default: {}
    },
    name: {
        type: String,
        default: '',
    },
    sessionKey: {
        type: String,
        default: ''
    }
})

const store = useStore()
const data = ref()
const response = ref()
const isOpen = ref(false)
const chatBotStatus = ref(props.meta.utm_source)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
  fetch()
}

    const fetch = async () => {
        
        const user = JSON.parse(localStorage.getItem('user'))
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;

        // console.log(props.sessionKey)
        // console.log(chatBotStatus.value)

        if(chatBotStatus.value === 'chatbot' || 'chatbot_ro') {
            const api = await Api.get(`/leads/chatbot-list/${props.sessionKey}`)
             response.value = api?.data?.data[0].response
             data.value = api?.data?.data
            //  console.log(response.value)
            //  console.log(data.value)
        } else {
            // console.log('Chatbot tidak ada')
        }

    }

</script>

<template>
                <span class="text-[15px] !text-[#FD8709]" @click="openModal">{{ name }}</span>

                <TransitionRoot appear :show="meta.utm_source === 'chatbot' && isOpen || meta.utm_source === 'chatbot_ro' && isOpen" as="template">

                    <Dialog as="div" @close="closeModal" class="relative z-10">
                      <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                      >
                        <div class="fixed inset-0 bg-black bg-opacity-25" />
                      </TransitionChild>
                
                      <div class="fixed inset-0 overflow-y-auto">
                        <div
                          class="flex min-h-full items-center justify-center p-4 text-center"
                        >

                          <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                          >



                            <DialogPanel
                              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                            >
                            
                        <div class="mt-2 mb-2 flex justify-center">
                          <button
                            type="button"
                            class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            @click="closeModal"
                          >
                            Tutup chat
                          </button>
                        </div>


                              <div v-for="(list, index) in response" :key="index">
                                <div class="chat-item flex gap-[3%] bg-[#fff] mx-[15px] justify-end items-center px-[15px] py-[10px]">
                
                                  <div class="text">
                                      <div class="flex flex-col justify-between items-center">
                                          <div class="flex gap-[5%] w-[90%]">
                                              <div class="contact-name text-[10px] bg-[#f0f0f0] px-[10px] py-[3px] rounded-[10px] font-black leading-[13px] flex-1 w-[90%]">
                                                  {{ list?.state?.message_text }}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                  
                                  <div class="profile-image">
                                      <img src="@/assets/ITsMin.svg" alt="">
                                  </div>
                      
                      
                              </div>
                  
                              <div class="chat-item flex gap-[3%] bg-[#fff] mx-[15px] items-center py-[10px] px-[15px]">

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
                            </div>

                            <div class="mt-2 mb-2 flex justify-center">
                              <button
                                type="button"
                                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                @click="closeModal"
                              >
                                Tutup chat
                              </button>
                            </div>

                            </DialogPanel>

                          </TransitionChild>

                        </div>
                      </div>
                    </Dialog>

                  </TransitionRoot>
</template>