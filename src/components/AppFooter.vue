<template>
  <div class="text-caption">
    <span>copyright (c) 2021</span>
    <v-btn
      class="footer-link pa-2"
      link
      target="_blank"
      href="https://jehwanyoo.net/"
      small
      elevation="0"
    >
      Jehwan Yoo
    </v-btn>
    <span>Please report bugs here. →</span>
    <v-btn
      icon
      link
      target="_blank"
      href="https://github.com/JeHwanYoo/lotto-extractor"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <span>{{ version }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PACKAGE from '../../package.json'

@Component({})
export default class AppFooter extends Vue {
  get version(): string {
    return PACKAGE.version
  }
}
</script>

<style lang="scss" scoped>
.footer-link {
  vertical-align: baseline;
}
</style>
