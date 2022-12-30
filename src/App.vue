<script setup lang="ts">
  import Header from './components/layout/Header.vue';
  import Footer from './components/layout/Footer.vue';
</script>

<template>
  <!-- header -->
  <Header />

  <!-- main -->
  <main class="flex flex-col container mx-auto px-4">
    <RouterView />
  </main>

  <!-- footer -->
  <Footer />
</template>
