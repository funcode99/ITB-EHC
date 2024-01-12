<script setup>
import { ref } from 'vue'
import Api from '@/utils/Api'
import { useToast } from "vue-toastification"
import { useStore } from 'vuex'
import router from '@/router';

const email = ref(null)
const password = ref(null)

const toast = useToast();
const store = useStore()

const onSubmit = async () => {

    try {
        store.commit('isLoading', true);

        const data = {
            email: email.value,
            password: password.value
        }

        const api = await Api.post('/login', data)

        localStorage.setItem('user', JSON.stringify(api.data.user))
        localStorage.setItem('token', JSON.stringify(api.data.data))

        store.commit('isLoading', false);

        toast.success(`Hai ${api.data.user.name}. Kamu berhasil login`, { position: 'top-center' })

        router.push('/')
    } catch (err) {
        store.commit('isLoading', false);

        toast.error(err?.response?.data?.message ?? 'Ooppss.. Ada Yang Error', { position: 'top-center' })
    }
}
</script>

<template>
    <div class="login">
        <img src="../assets/ITSBuah-Login.svg" alt="">
        <h1 class="panel">Admin Panel IT's Buah</h1>
        <div class="login-container relative">
            <h1 class="text-[32px] green">Sign In</h1>
            <h1 class="text-[10px] mb-[39px] mt-[6px] text-[#9F9F9F] leading-[13px] font-medium">Enter your email and
                password to access admin panel</h1>
            <form @submit.prevent="onSubmit" id="submit">
                <label for="" class="green leading-[13px]">Email address</label>
                <input v-model="email" type="email" placeholder="Enter email" required>
                <div class="spacer"></div>
                <label for="" class="green leading-[13px]">Password</label>
                <input v-model="password" type="password" placeholder="Enter password" required>
            </form>
            <div class="mb-[37px]"></div>
            <button class="absolute right-[18px]" type="submit" form="submit">
                <h1 class="text-[10px]">Sign In</h1>
            </button>
        </div>
    </div>

</template>

<style lang="scss">
.green {
    color: #227900;
}

.login {
    padding: 20px;

    img {
        padding-top: 6vh;
        margin: auto;
    }

    .panel {
        font-size: 20px;
        padding-top: 16px;
        text-align: center;
        margin-bottom: 70px;
    }

    .login-container {
        background: white;
        width: 89%;
        height: 375px;
        padding: 12px 5%;
        border-radius: 10px;
        margin: auto;

        button {
            color: white;
            background: #FD8709;
            padding: 12px 15px;
            border-radius: 10px;
        }

        label {
            font-size: 14px;
        }

        input {
            font-size: 12px;
            width: 100%;
            padding: 12px 14px;
            background: #EDECFA;
            border-radius: 10px;
        }

        ::placeholder {
            color: #b9b9b9;
            font-size: 12px;
        }

        .spacer {
            margin-top: 16px;
        }
    }
}
</style>