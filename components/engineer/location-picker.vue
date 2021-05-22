<template>
  <bottom-menu>
    Выберите метку
    <span class="float-right" @click="closePicker">X</span>
    <!--    <div class="flex justify-between mt-4 mb-4">-->
    <!--      <div-->
    <!--        v-for="status in statuses"-->
    <!--        :key="status.value"-->
    <!--        class="status"-->
    <!--        :class="{ chosen: selected === status.value }"-->
    <!--        @click="chooseStatus(status.value)"-->
    <!--      >-->
    <!--        <div class="status__value">{{ status.value }}</div>-->
    <!--        <div class="status__text">{{ status.text }}</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <designed-button class="mt-4" text="Далее" @click="emitNext" />
  </bottom-menu>
</template>

<script>
import DesignedButton from '@/components/designed-button'
import BottomMenu from '@/components/engineer/bottom-menu'

export default {
  components: { DesignedButton, BottomMenu },
  data() {
    return {}
  },
  methods: {
    closePicker() {
      this.$emit('closePicker')
    },
    emitNext() {
      this.$emit('next', { status: this.selected })
    },
  },
}
</script>

<style scoped></style>
