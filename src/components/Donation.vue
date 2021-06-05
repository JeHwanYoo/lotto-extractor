<template>
  <v-container class="text-center">
    <v-row>
      <v-col class="pa-0">
        <h2>Donation</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-img class="mx-auto" width="150" height="150" src="@/assets/DAI.png">
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0" offset="1" cols="10">
        <v-text-field :value="wallet" readonly @click="copy"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4 pa-0">
        <span>
          혹시 당첨되면... 조금만 기부해주세요 😥... <br />
          다이(DAI), 테더(USDT), 이더리움(ETH) 등을 후원 받습니다.
        </span>
      </v-col>
    </v-row>
    <v-snackbar :timeout="1500" v-model="snackbar">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Donation extends Vue {
  wallet = '0x6445757175BA66274cB50BEDEA79c679a09a4f59'
  snackbar = false
  snackbarText = ''

  copy(): void {
    this.$copyText(this.wallet)
      .then(() => {
        this.snackbar = true
        this.snackbarText = '클립보드에 복사되었습니다!'
      })
      .catch(() => {
        this.snackbar = true
        this.snackbarText = '에러가 발생했습니다! 다시 시도해주세요.'
      })
  }
}
</script>
