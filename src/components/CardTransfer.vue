<script setup lang="ts">
  import { reactive, watchEffect, computed } from 'vue';
  import IconChange from './icons/IconChange.vue';
  import { useRunnableAlgorithm } from '../composables/algorithms/runnableAlgorithm';

  interface CardTransferProps {
    secretKey: string;
    algorithm: string;
  }

  interface CardTransferModel {
    from: string;
    to: string;
    operation: 'encryption' | 'decryption';
    error: string;
  }

  interface Title {
    from: string;
    to: string;
  }

  const props = defineProps<CardTransferProps>();

  const model: CardTransferModel = reactive({
    from: '',
    to: '',
    operation: 'encryption',
    error: '',
  });

  const title = computed((): Title => {
    return {
      from: model.operation === 'encryption' ? 'Plain Text' : 'Cipher Text',
      to: model.operation === 'encryption' ? 'Cipher Text' : 'Plain Text',
    };
  });

  const toggleOperation = (): void => {
    model.from = '';
    model.to = '';

    model.operation = model.operation === 'encryption' ? 'decryption' : 'encryption';
  };

  watchEffect(() => {
    if (!model.from || !props.algorithm || !props.secretKey) {
      return;
    }

    try {
      model.error = '';

      model.to = useRunnableAlgorithm(
        props.algorithm,
        props.secretKey,
        model.from,
        model.operation
      );
    } catch (error: any) {
      model.error = error.message;
    }
  });
</script>

<template>
  <!-- error message -->
  <div
    class="bg-red-400 mt-8 p-4 text-center text-red-800 rounded"
    v-if="model.error.length > 0"
  >
    {{ model.error }}
  </div>

  <!-- card transfer -->
  <section class="bg-gray-500 my-4 rounded shadow flex flex-col">
    <!-- headers titles -->
    <div class="flex justify-center items-center border-b-[1px] border-gray-200 p-4">
      <div class="w-1/2 text-3xl drop-shadow text-primary-gradient">{{ title.from }}</div>
      <div class="text-3xl drop-shadow text-primary-gradient px-2">
        <IconChange
          class="cursor-pointer transition-primary hover:text-primary"
          @click="toggleOperation()"
        />
      </div>
      <div class="w-1/2 text-3xl drop-shadow text-primary-gradient pl-2">{{ title.to }}</div>
    </div>

    <!-- cards -->
    <div class="flex">
      <!-- card from -->
      <div class="w-1/2 border-r-[1px] border-gray-200 h-[200px]">
        <textarea
          class="border-0 outline-0 w-full p-3 text-base text-gray-400 h-full hover:ring-4 focus:ring-2 bg-transparent transition-primary"
          placeholder="Enter Your Text"
          v-model="model.from"
        />
      </div>

      <!-- card to -->
      <div class="w-1/2">
        <textarea
          class="border-0 outline-0 w-full p-3 text-gray-400 h-full hover:ring-4 focus:ring-2 bg-transparent transition-primary"
          v-model="model.to"
          readonly
        />
      </div>
    </div>
  </section>
</template>
