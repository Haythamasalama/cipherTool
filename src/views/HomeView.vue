<script setup lang="ts">
  import { reactive } from 'vue';
  import CardTransfer from '../components/CardTransfer.vue';
  import AlgorithmMenus from '../components/AlgorithmMenus.vue';

  const model = reactive<{
    menus: {
      title: string;
      algorithm: string;
      selected: boolean;
    }[];
    key: string;
    showKeyInput: boolean;
  }>({
    menus: [
      {
        title: 'Hill Cipher',
        algorithm: 'hillCipher',
        selected: true
      },
      {
        title: 'DES',
        algorithm: 'des',
        selected: false
      }
    ],
    key: '',
    showKeyInput: false
  });

  const getSelected = () => model.menus.find((menu) => menu.selected)?.algorithm || 'hillCipher';
</script>

<template>
  <!-- algorithm menus  -->
  <AlgorithmMenus :menus="model.menus">
    <!-- key toggle  -->
    <button
      class="btn mr-2 text-xl font-medium"
      :class="model.key.length > 0 ? 'btn-primary' : 'btn-primary-inactive'"
      @click="model.showKeyInput = !model.showKeyInput"
    >
      {{ model.key.length > 0 ? "Change Key" : "Enter Key" }}
      🔐
    </button>

    <!-- key input  -->
    <input
      v-if="model.showKeyInput"
      type="text"
      v-model="model.key"
      class="rounded border-2 outline-0 text-base text-gray-400 hover:ring-4 focus:ring-2 bg-transparent ml-2 px-3 transition-primary"
      minlength="9"
      placeholder="Key"
    />
  </AlgorithmMenus>

  <!-- card transfer  -->
  <CardTransfer :secretKey="model.key" :algorithm="getSelected()" />
</template>
