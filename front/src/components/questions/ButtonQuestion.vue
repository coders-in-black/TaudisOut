<template>
  <div class="question">
    <slot></slot>

    <div class="btn__content">
    <v-ons-button
      :modifier="{outline: choice.value === value}"
      v-for="choice in realChoices"
      :key="choice.value"
      @click="$emit('update:value', choice.value)"
    >{{ choice.label }}</v-ons-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    choices: {type: Array, required: true},
    value: {required: true},
    showUnknown: {type: Boolean, required: false},
  },
  computed: {
    realChoices () {
      let choices = this.choices.map(c => {return c})
      if (this.showUnknown) {
        choices.push({label: 'Je ne sais pas', value: null})
      }
      return choices
    }
  }
}
</script>
<style>
.button {
  margin-left: 1em;
}
</style>
