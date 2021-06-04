<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8" class="text-center">
        <v-sheet elevation="3">
          <h1>로또 번호 추첨기</h1>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" offset-md="2" md="8" class="text-center">
        <lotto-option />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { LottoData } from '@/store'
import { Getter } from 'vuex-class'
import LottoOption from '@/components/LottoOption.vue'

@Component({
  components: { LottoOption },
})
export default class Lotto extends Vue {
  @Getter('lottos') lottos!: LottoData[]
}
</script>
