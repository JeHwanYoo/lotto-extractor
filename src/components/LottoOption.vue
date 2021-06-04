<template>
  <v-sheet class="pa-2" elevation="3">
    <lotto-option-text-field
      label="포함할 숫자 [1-45] (,)로 구분"
      @change="include => splitString(changeInclude, include)"
    />
    <lotto-option-text-field
      label="제외할 숫자 [1-45] (,)로 구분"
      @change="exclude => splitString(changeExclude, exclude)"
    />
    <v-container>
      <v-row>
        <v-col cols="3">
          <label>구매 수량</label>
        </v-col>
        <v-col cols="6">
          <plus-minus-field
            :value="5"
            :min="1"
            :max="100"
            @input="filterCount"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 px-2">
          <v-switch
            label="모든 숫자를 다르게 찍기"
            v-model="unique"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 px-2">
          <v-switch
            v-bind="attrs"
            v-on="on"
            label="역대 당첨 번호 제외"
            v-model="history"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-right">
          <span class="text-caption">
            ※ 로또는 독립 시행 게임이므로 이전 결과가 다음 결과에 영향을 미치지
            않습니다.
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { LottoOption as LO } from '@/store'
import { Getter, Mutation } from 'vuex-class'
import LottoOptionTextField from '@/components/LottoOptionTextField.vue'
import PlusMinusField from '@/components/v-minusplusinput/v2/components/PlusMinusField.vue'

@Component({
  components: { LottoOptionTextField, PlusMinusField },
})
export default class LottoOption extends Vue {
  @Getter('option') option!: LO
  @Mutation('changeInclude') changeInclude!: (include: number[]) => void
  @Mutation('changeExclude') changeExclude!: (exclude: number[]) => void
  @Mutation('changeCount') changeCount!: (count: number) => void
  @Mutation('changeUnique') changeUnique!: (unique: boolean) => void
  @Mutation('changeHistory') changeHistory!: (history: boolean) => void
  unique = false
  history = false

  splitString(method: (n: number[]) => void, stringData: string): void {
    let splitData: number[]
    if (stringData) {
      splitData = [
        ...new Set(
          stringData
            .split(',')
            .map(v => parseInt(v))
            .filter(v => !isNaN(v)),
        ),
      ]
    } else {
      splitData = []
    }
    method(splitData)
  }

  filterCount(n: number): void {
    this.changeCount(n)
  }

  @Watch('unique')
  watchUnique(newValue: boolean): void {
    this.changeUnique(newValue)
  }

  @Watch('history')
  watchHistory(newValue: boolean): void {
    this.changeHistory(newValue)
  }
}
</script>
