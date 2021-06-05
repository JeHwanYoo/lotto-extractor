<template>
  <v-app>
    <v-main>
      <lotto />
    </v-main>
    <v-footer>
      <app-footer />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Lotto from '@/components/Lotto.vue'
import AppFooter from '@/components/AppFooter.vue'

@Component({
  components: { Lotto, AppFooter },
})
export default class App extends Vue {
  metaInfo = {
    title: '행운의 로또 추첨기',
  }
}
</script>
