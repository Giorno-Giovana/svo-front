<template>
  <bottom-menu>
    <div class="flex justify-between">
      <div>Выберите объем снега</div>
      <div>{{ snowVolumeText }}</div>
    </div>
    <div class="mb-10">
      <a-slider v-model="snowVolume" :min="0" :max="10" />
    </div>
    <div class="flex">
      <designed-button secondary style="margin-right: 5px" text="Назад" @click="$emit('back')" />
      <designed-button style="margin-left: 5px" text="Далее" @click="$emit('next')" />
    </div>
  </bottom-menu>
</template>

<script>
import DesignedButton from '../designed-button'
import BottomMenu from './bottom-menu'
export default {
  name: 'SnowPicker',
  components: { DesignedButton, BottomMenu },
  data() {
    return {
      snowVolume: 5,
    }
  },
  computed: {
    // TODO доделать эту секцию
    snowVolumeText() {
      return '10-15 см'
    },
  },
}
</script>

<style scoped></style>
