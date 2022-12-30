<script setup lang="ts">
  interface AlgorithmMenu {
    title: string;
    algorithm: string;
    selected: boolean;
  }

  interface MenusProps {
    menus: Array<AlgorithmMenu>;
  }

  const props = defineProps<MenusProps>();

  const select = (selectedMenu: AlgorithmMenu) => {
    props.menus.forEach(menu => {
      menu.selected = menu.algorithm === selectedMenu.algorithm;
    });
  };
</script>

<template>
  <div class="flex flex-row">
    <button
      v-for="(menu, key) in props.menus"
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
