<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">
        {{ $t('404') }}
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ $t('Oops. Nothing here...') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Error404 extends Vue {}
</script>
