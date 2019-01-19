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
    <label class="right" v-if="sampleUrl">
      <v-ons-button @click="showModal = true">Voir un example</v-ons-button>
      <v-ons-dialog cancelable :visible.sync="showModal">
        <img :src="sampleUrl" alt>
        <v-ons-button @click="showModal = false">Close</v-ons-button>
      </v-ons-dialog>
    </label>
  </v-ons-list-item>
</template>
<script>
export default {
  props: ['inputId', 'label', 'sampleUrl'],
  data () {
    return {
      showModal: false
    }
  }
}
</script>
