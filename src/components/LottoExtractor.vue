<template>
  <v-sheet class="pa-2" elevation="3">
    <v-container>
      <v-row>
        <v-col>
          <v-btn x-large color="success">추출하기</v-btn>
        </v-col>
      </v-row>
      <v-row v-for="(numbers, index) in extracted" :key="index">
        <v-col>
          <v-avatar
            class="mx-1"
            v-for="(number, index) in numbers"
            :key="index"
            :color="selectColor(number)"
          >
            <span>{{ number }}</span>
          </v-avatar>
        </v-col>
      </v-row>
    </v-container>
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

  mounted(): void {
    this.clearExtracted()
    this.pushExtracted([1, 3, 10, 15, 20, 25])
    this.pushExtracted([1, 2, 36, 42, 44, 45])
    console.log(this.extracted)
  }
}
</script>
