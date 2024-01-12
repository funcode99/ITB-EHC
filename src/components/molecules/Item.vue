<template>
  <div class="item">
    <h1 class="pt-[5px] pl-[7px] text-[12px] leading-[10px]">{{ status }}</h1>
    <h1 class="pl-[7px] text-[32px] leading-[33px] orange pt-[7px]">{{ leadsdetail }}</h1>
    <span v-if="percentage != null" class="pb-[5px] pl-[7px] text-[8px]">({{ percentage }}%)</span>
    <img class="picture" :src="resolve_img_url(image)" alt="">
  </div>
</template>

<script>
// gak boleh pake strip, bakal dianggap sebagai angka
export default {
  name: 'Item',
  props: ['status', 'percentage', 'leadsdetail', 'image'],
  methods: {
    resolve_img_url: function (path) {
      let images = require.context('@/assets/', false, /\.svg$|\.svg$/)
      return images("./" + path)
    }
  }
}
</script>

<style lang="scss">

</style>