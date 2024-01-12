<script setup>
import SearchInput from '@/components/molecules/SearchInput.vue'
import ExportButton from '@/components/molecules/ExportButton.vue'
import FilterButton from '@/components/molecules/FilterButton.vue'
import DateRangePicker from '@/components/molecules/DateRangePicker.vue'
import ListsOrderOnline from '@/components/organisms/ListsOrderOnline.vue'
import DashboardHome from '@/components/organisms/DashboardHome.vue'
import Navbar from '@/components/molecules/Navbar.vue'
import { useStore } from 'vuex'

const store = useStore()

</script>

<template>
  <div class="home">

    <Navbar />

    <div v-if="false" class="notification-board">
      <p class="font-medium">You have 3 new orders. </p>
      <div class="spacer2"></div>
      <h2 class="font-bold"> Click here to refresh</h2>
    </div>

    <DateRangePicker class="mx-[15px] my-[8px]" />

    <DashboardHome />

    <div class="mx-[15px]">
      <div class="grid gap-[8px]" :class="[store.getters.canFilterHandleBy ? 'grid-cols-4' : 'grid-cols-5']">
        <SearchInput :class="[store.getters.canFilterHandleBy ? 'col-span-2' : 'col-span-3']" />
        <ExportButton v-if="store.getters.canFilterHandleBy" class="col-span-1" />
        <FilterButton :class="[store.getters.canFilterHandleBy ? 'col-span-1' : 'col-span-2']" />
      </div>

      <div class="p-[14px] bg-white mt-[8px] rounded-[10px] flex flex-col gap-[22px]">
        <ListsOrderOnline />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home {
  padding-top: 15px;
  padding-bottom: 15px;

  h1,
  span {
    color: #626262;
  }

  .orange {
    color: #FD8709;
  }

  .notification-board {
    background: #FD8709;
    border-radius: 10px;
    font-size: 8px;
    margin-left: 15px;
    margin-right: 15px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 7px;
    margin-bottom: 8px;
    font-weight: 700;
  }

  .spacer {
    height: 10px;
  }

  .spacer2 {
    width: 2px;
  }

  .first {
    margin-left: 15px;
    margin-right: 15px;

    .item {
      border-radius: 10px;
      background: white;
      position: relative;

      .top {
        display: flex;
        justify-content: space-between;

        button {
          font-size: 8px;
          font-weight: 700;
          width: 46px;
          height: 16px;
          background: #FD8709;
          color: white;
          border-radius: 10px;
          text-align: center;
        }
      }

      span {
        display: block;
      }

      .picture {
        position: absolute;
        right: 3%;
        bottom: 9%;
        width: 26px;
        height: 18px;
      }
    }
  }

  .second {
    margin-left: 15px;
    margin-right: 15px;

    .item {
      border-radius: 10px;
      background: white;
      position: relative;

      .picture {
        position: absolute;
        right: .5vw;
        bottom: .5vh;
      }

      .size {
        width: 22px;
        height: 22px;
      }
    }
  }

  .third {
    margin-left: 15px;
    margin-right: 15px;

    .item {
      border-radius: 10px;
      background: white;
      position: relative;

      .picture {
        position: absolute;
        right: .5vw;
        bottom: .5vh;
      }
    }
  }


}
</style>