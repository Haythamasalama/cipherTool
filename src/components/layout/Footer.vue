<script setup lang="ts">
  import IconGithub from '../icons/IconGithub.vue';
  import IconTwitter from '../icons/IconTwitter.vue';
</script>

<template>
  <footer
    class="text-gray-400 text-base font-medium flex flex-col items-center container mx-auto p-4 capitalize"
  >
    <!-- source code button -->
    <a
      class="flex text-white my-4 border-4 transition-primary p-3 rounded hover:bg-primary-gradient hover:ring-2 hover:ring-primary-gradient"
      href="https://github.com/HaythamaSalama/cipherTool"
      target="_blank"
    >
      <IconGithub class="mx-2" />
      source code
    </a>

    <!-- developed by  -->
    <div class="flex my-2">
      <p class="mr-2">
        made with ❤️ by
        <a
          class="font-bold hover:text-primary transition-primary"
          href="http://haythamasalama.me/"
          target="_blank"
        >
          haytham salama
        </a>
      </p>

      <div class="flex">
        <a
          href="https://github.com/HaythamaSalama"
          target="_blank"
        >
          <IconGithub class="mx-2" />
        </a>
        <a
          href="https://twitter.com/HaythamaSalama"
          target="_blank"
        >
          <IconTwitter class="mx-2" />
        </a>
      </div>
    </div>

    <!-- copyright -->
    <div class="my-2">© 2022 cipher tool. all rights reserved.</div>
  </footer>
</template>
