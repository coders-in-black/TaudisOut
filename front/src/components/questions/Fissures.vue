<template>
  <div>
    <h4>Les murs de votre logement présentent-ils des fissures?</h4>
    <div v-if="cracks === null">
      <v-ons-button @click="cracks = true">Oui</v-ons-button>
      <v-ons-button @click="$emit('filled', {answer: false, next: null})">Non</v-ons-button>
    </div>
    <div v-if="cracks">
      <v-ons-list-title>Combien de fissures voyez-vous ?</v-ons-list-title>
      <v-ons-list v-for="row in countChoices" :key="row.value" tappable>
        <v-ons-list-item>
          <label class="left">
            <v-ons-radio :input-id="'radio-' + row.value" :value="row.value" v-model="detail.count"></v-ons-radio>
          </label>
          <label :for="'radio-' + row.value" class="center">{{ row.label }}</label>
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-list-title>Décrivez la nature et l'apparence des fissures constatées</v-ons-list-title>
      <v-ons-list tappable>
        <image-choice
          :input-id="'traversante'"
          :label="'La fissure est traversante (visible des deux côtés du mur)'"
          :sample-url="'http://example.com/test.png'"
          @updated="handle('traversante', $event)"
        ></image-choice>
        <image-choice
          :input-id="'interieur'"
          :label="'La fissure est présente sur un mur intérieur du bâtiment'"
          :sample-url="'http://example.com/test.png'"
          @updated="handle('interieur', $event)"
        ></image-choice>
        <image-choice
          :input-id="'exterieur'"
          :label="'La fissure est présente sur un mur exterieur du bâtiment'"
          :sample-url="'http://example.com/test.png'"
          @updated="handle('exterieur', $event)"
        ></image-choice>
      </v-ons-list>
      <v-ons-button
        @click="$emit('filled', {answer: {cracks: true, detail: detail}, next: null})"
      >Étape suivante</v-ons-button>
    </div>
  </div>
</template>

<script>

import ImageChoice from './ImageChoice'

export default {
  components: {
    ImageChoice
  },
  data () {
    return {
      cracks: null,
      detail: {
        count: 0,
      },
      countChoices: [{value: 1, label: 'Une fissure'}, {value: 2, label: 'Entre deux et cinq fissures'}, {value: 5, label: 'Plus de cinq fissures'}]
    }
  },
  methods: {
    handle (type, value) {
      this.detail[type] = value
    }
  }
}
</script>
