<script setup>
import Navbar from '@/components/molecules/Navbar.vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ref, computed, onBeforeMount } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import FixedTabPanel from '@/components/molecules/FixedTabPanel.vue';

const categories = ref({
  Equals: [
    {
      id: 1,
      name: 'Alifa'
    },
    {
      id: 2,
      name: 'Angga'
    },
    {
      id: 3,
      name: 'Chintia'
    },
    {
      id: 4,
      name: 'Diajeng'
    },
    {
      id: 5,
      name: 'Fredy'
    },
    {
      id: 6,
      name: 'Rinta'
    },
    {
      id: 7,
      name: 'Triya'
    },
    {
      id: 8,
      name: 'Tyas'
    },
  ],
  Percentage: [

  ],
  Fixed: [

  ],
})

let query = ref('')

let filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) =>
      person.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
)
</script>

<template>

  <div class="admin">

    <Navbar class="mx-[0px]" />

    <h1 class="mt-[10px] text-[15px] font-bold text-[#23690a]">Leads Distribution</h1>

    <!-- tabs -->
    <div class="mt-[10px]">
      <TabGroup>

        <TabList class="flex space-x-1 rounded-xl bg-[#23690a] p-1">
          <Tab as="template" v-slot="{ selected }" disabled>
            <button :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#23690a]',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]">
              Equals
            </button>
          </Tab>
          <Tab as="template" v-slot="{ selected }" disabled>
            <button :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#23690a]',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]">
              Percentage
            </button>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <button :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#23690a]',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]">
              Fixed
            </button>
          </Tab>

        </TabList>

        <TabPanels class="mt-2">

          <!-- berfungsi untuk looping -->
          <!-- v-for="(posts, idx) in Object.values(categories)" -->
          <TabPanel :class="[
            'rounded-t-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ',
          ]">

            <!-- checkbox  -->
            <ul v-for="(posts, idx) in Object.values(categories)" :key="idx">
              <li v-for="post in posts" :key="post.id" class="relative rounded-md p-3 hover:bg-gray-100">
                <div class="flex justify-between">
                  <p>{{ post.name }}</p>
                  <input type="checkbox">
                </div>
              </li>
            </ul>
          </TabPanel>

          <TabPanel :class="[
            'rounded-t-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]">
            <ul>
              <li>
                <div>
                  <div class="flex justify-between">
                    <p>Chintia</p>
                    <button>X</button>
                  </div>

                  <div class="flex justify-between gap-[15px] items-center">
                    <p>1</p>
                    <input type="range" min="0" max="100" value="30"
                      class="range range-success range-xs bg-[#d9d9d9]" />
                  </div>
                </div>
              </li>
            </ul>
          </TabPanel>

          <FixedTabPanel />

        </TabPanels>

      </TabGroup>
    </div>

  </div>
</template>

<style lang="scss">
.admin {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>

