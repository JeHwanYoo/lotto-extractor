<template>
  <v-sheet class="pa-2" elevation="3">
    <v-container>
      <v-row>
        <v-col>
          <v-btn x-large color="green accent-3" @click="extract">
            추출하기
          </v-btn>
        </v-col>
        <v-col v-show="extracted.length > 0">
          <v-btn x-large color="lime accent-1" @click="copy">복사하기</v-btn>
        </v-col>
        <v-col v-show="extracted.length > 0">
          <v-btn x-large color="amber accent-3" @click="save">저장하기</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="lotto-extractor">
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
import randomItem from 'random-item'
import { LottoOption, LottoData } from '@/store'

@Component({})
export default class LottoExtractor extends Vue {
  @Getter('extracted') extracted!: number[][]
  @Getter('option') option!: LottoOption
  @Getter('lottos') lottos!: LottoData[]
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

  get numberArrange(): number[] {
    const array = []
    for (let i = 1; i <= 45; i++) {
      array.push(i)
    }
    return array
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

  extract(): void {
    this.clearExtracted()
    let counter = 0
    let fail = 0
    let pool: number[] = []
    const include = this.option.include.slice(0, 6)
    const exclude = this.option.exclude.slice(0, 39)
    while (counter < this.option.count) {
      if (fail === 100) {
        break
      }
      let innerCounter = 0
      let item: number[] = []
      if (!this.option.unique) {
        item = item.concat(include)
        innerCounter = item.length
      }
      while (innerCounter < 6) {
        const number = randomItem(this.numberArrange)
        if (!item.includes(number)) {
          if (this.option.unique && pool.includes(number)) continue
          if (!this.option.unique && exclude.includes(number)) continue
          pool.push(number)
          item.push(number)
          innerCounter++
        }
      }
      item.sort((a, b) => a - b)
      if (
        this.option.history &&
        this.lottos.some(a =>
          a.numbers.slice(0, 6).every((b, i) => b === item[i]),
        )
      ) {
        console.log('fail')
        fail++
        continue
      }
      this.pushExtracted(item)
      counter++
    }
    if (counter < this.option.count) {
      this.snackbar = true
      this.snackbarText =
        '만약 구매 수량과 다르다면, 조건을 잘못 설정했을 가능성이 있어요.'
    }
  }

  mounted(): void {
    this.clearExtracted()
  }
}
</script>

<style lang="scss" scoped>
.lotto-extractor {
  max-height: 400px;
  overflow-y: auto;
}
</style>
