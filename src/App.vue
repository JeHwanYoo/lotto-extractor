<template>
  <v-app>
    <v-main>
      <lotto />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Lotto from '@/components/Lotto.vue'

@Component({
  components: { Lotto },
})
export default class App extends Vue {}
</script>
