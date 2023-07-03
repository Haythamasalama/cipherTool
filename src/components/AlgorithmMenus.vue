<script setup lang="ts">
  type AlgorithmMenu = {
    title: string;
    algorithm: string;
    selected: boolean;
  }

  const props = defineProps<{
    menus: AlgorithmMenu[];
  }>();

  const select = (selectedMenu: AlgorithmMenu) => {
    props.menus.forEach(menu => {
      menu.selected = menu.algorithm === selectedMenu.algorithm;
    });
  };
</script>

<template>
  <div class="flex flex-row">
    <button
      v-for="(menu, key) in menus"
      :key="key"
      class="btn mr-2 text-xl font-medium"
      :class="`${menu.selected ? 'btn-primary' : 'btn-primary-inactive'}`"
      @click="select(menu)"
    >
      {{ menu.title }}
    </button>

    <slot />
  </div>
</template>
