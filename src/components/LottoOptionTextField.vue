<template>
  <v-container>
    <v-row>
      <v-col class="pa-0 px-2 pb-4">
        <v-text-field
          ref="field"
          class="pa-0"
          :label="label"
          :type="type"
          v-model="data"
          hide-details
          :disabled="disabled"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class LottoOptionField extends Vue {
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) defaultText!: string
  @Prop({ default: 'text' }) type!: string
  @Prop({ default: false }) disabled!: boolean
  data = ''

  @Watch('data')
  change(): void {
    this.$emit('change', this.data)
  }

  mounted(): void {
    this.data = this.defaultText
  }
}
</script>
