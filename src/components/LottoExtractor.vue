<template>
  <v-sheet class="lotto-extractor pa-2" elevation="3">
    <v-container>
      <v-row>
        <v-col>
          <v-btn x-large color="green accent-3">추출하기</v-btn>
        </v-col>
        <v-col v-show="extracted.length > 0">
          <v-btn x-large color="lime accent-1" @click="copy">복사하기</v-btn>
        </v-col>
        <v-col v-show="extracted.length > 0">
          <v-btn x-large color="amber accent-3" @click="save">저장하기</v-btn>
        </v-col>
      </v-row>
      <v-row v-for="(numbers, index) in extracted" :key="index">
        <v-col>
          <v-sheet class="pa-2" color="indigo lighten-5">
            <v-avatar
              class="mx-1"
              v-for="(number, index) in numbers"
              :key="index"
              :color="selectColor(number)"
              :size="ballSize"
            >
              <span class="font-weight-bold">{{ number }}</span>
            </v-avatar>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar :timeout="1500" v-model="snackbar">
      {{ snackbarText }}
    </v-snackbar>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'

@Component({})
export default class LottoExtractor extends Vue {
  @Getter('extracted') extracted!: number[][]
  @Mutation('clearExtacted') clearExtracted!: () => void
  @Mutation('pushExtracted') pushExtracted!: (numbers: number[]) => void
  snackbar = false
  snackbarText = ''

  get ballSize(): number {
    return this.$vuetify.breakpoint.smAndDown ? 30 : 40
  }

  get clipboardText(): string {
    return this.extracted.map(numbers => numbers.toString()).join('\n')
  }

  selectColor(n: number): string {
    if (n < 10) {
      return 'yellow lighten-3'
    } else if (n < 20) {
      return 'blue lighten-3'
    } else if (n < 30) {
      return 'red lighten-3'
    } else if (n < 40) {
      return 'blue-grey lighten-3'
    } else {
      return 'green lighten-3'
    }
  }

  copy(): void {
    this.$copyText(this.clipboardText)
      .then(() => {
        this.snackbar = true
        this.snackbarText = '클립보드에 복사되었습니다!'
      })
      .catch(() => {
        this.snackbar = true
        this.snackbarText = '에러가 발생했습니다! 다시 시도해주세요.'
      })
  }

  save(): void {
    const blob = new Blob([this.clipboardText], { type: 'text/csv' })
    const filename = `로또번호-${Date.now()}.csv`
    // for Internet Explorer
    if (/Trident\/|Edge\//.test(window.navigator.userAgent)) {
      window.navigator.msSaveOrOpenBlob(blob, filename)
    }
    // for Firefox, Chrome, Opera
    else {
      var fileLink = document.createElement('a')
      fileLink.download = filename
      fileLink.href = window.URL.createObjectURL(blob)
      document.body.appendChild(fileLink)
      fileLink.click()
      fileLink.remove()
    }
  }

  mounted(): void {
    this.clearExtracted()
    this.pushExtracted([1, 2, 3, 4, 5, 6])
    this.pushExtracted([1, 2, 3, 4, 5, 6])
    this.pushExtracted([1, 2, 3, 4, 5, 6])
    this.pushExtracted([1, 2, 3, 4, 5, 6])
  }
}
</script>

<style lang="scss" scoped>
.lotto-extractor {
  max-height: 400px;
  overflow-y: auto;
}
</style>
