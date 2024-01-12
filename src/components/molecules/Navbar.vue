<script setup>
import ProfileButton from '@/components/molecules/ProfileButton.vue'
import { ref } from 'vue'
const userInfo = localStorage.getItem('user')
const user = JSON.parse(userInfo)
const isi = ref(user.privillege_level)

</script>

<template>
    <div class="navbar-custom">
        <div class="icon-left">
            <img src="@/assets/ITsBuah.svg" alt="">
        </div>
        <div class="icon-right">
            <router-link to="/chat">
                <div>
                    <img src="@/assets/MessageIcon.svg" alt="">
                </div>
            </router-link>
            <div v-if="isi > 2">
                <router-link to="/admin">
                    <div class="bg-[#23690a] color green">
                        <img src="../../assets/Vector.svg" alt="">
                    </div>
                </router-link>
            </div>
            <div v-else>
                <img src="" alt="">
            </div>
            <div class="color">
                <img src="@/assets/admin-inactive.svg" alt="">
            </div>
            <div class="color">
                <img src="@/assets/profile2user.svg" alt="">
            </div>
            <router-link to="/">
                <div class="green">
                    <img src="@/assets/clipboardtext.svg" alt="">
                </div>
            </router-link>
            <ProfileButton />
        </div>
    </div>
</template>

<style lang="scss">
.navbar-custom {
    margin-left: 15px;
    margin-right: 15px;
    height: 46px;
    border-radius: 10px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon-left {
        margin: 8px;

        img {
            width: 34px;
            height: 34px;
        }
    }

    .icon-right {
        margin: 11px;
        display: flex;
        gap: 6px;

        .color {
            background: #EDECFA;
            border-radius: 7px;
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 15px;
                height: 15px;
            }
        }

        .green {
            background: green;
            border-radius: 7px;
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 15px;
                height: 15px;
            }
        }
    }
}
</style>
