<template>
  <div>
    copyright (c) 2021
    <v-btn
      class="footer-link pa-0"
      link
      target="_blank"
      href="https://jehwanyoo.net/"
      small
      elevation="0"
    >
      Jehwan Yoo
    </v-btn>
    <v-btn
      icon
      link
      target="_blank"
      href="https://github.com/JeHwanYoo/lotto-extractor"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class AppFooter extends Vue {}
</script>

<style lang="scss" scoped>
.footer-link {
  vertical-align: baseline;
}
</style>
