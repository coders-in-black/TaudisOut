<template>
  <v-ons-list-item>
    <label class="left">
      <v-ons-checkbox
        :input-id="inputId"
        :value="label"
        @changed="$emit('updated', $event.target.value)"
      ></v-ons-checkbox>
    </label>
    <label class="center" :for="inputId">{{ label }}</label>
    <label class="right" v-if="sampleUrl">Voir un example</label>
  </v-ons-list-item>
</template>
<script>
export default {
  props: ['inputId', 'label', 'sampleUrl']
}
</script>
