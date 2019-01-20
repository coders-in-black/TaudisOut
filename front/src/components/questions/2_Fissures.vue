<template>
  <div>
    {{ detail }}
    <h4>Les murs de votre habitation présentent-ils des fissures?</h4>
    <div v-if="cracks === null">
      <div class="btn__content">
        <v-ons-button @click="cracks = true">Oui</v-ons-button>
        <v-ons-button @click="$emit('filled', {next: 'photos'})">Non</v-ons-button>
      </div>
    </div>
    <div v-if="cracks">
      <button-question class="mbm"
        :choices="[{label: 'Sur la facade', value: 'facade'}, {label: 'Dans la cage d\'escalier', value: 'escalier'}, {label: 'Dans un appartement', value: 'appartement'}]"
        :value.sync="detail.lieu"
      >
        <h4>À quel endroit se trouve la fissure ?</h4>
      </button-question>
      <button-question class="mbm"
        :choices="[{label: 'En escalier', value: 'escalier'}, {label: 'Droite', value: 'droite'}]"
        :show-unknown="true"
        :value.sync="detail.forme"
      >
        <h4>Quelle est la forme de la fissure ?</h4>
      </button-question>
      <button-question class="mbm"
        :choices="[{label: 'Oui', value: true}, {label: 'Non', value: false}]"
        :value.sync="detail.traversante"
      >
        <h4>Est-ce que la fissure est traversante ?</h4>
        <p>Une fissure traversante est une fissure visible des deux côtés du mur</p>
      </button-question>
      <div v-if="detail.lieu === 'facade'">
        <button-question class="mbm"
          :choices="[{label: 'Sous les fenêtres', value: 'linteauxFenetres'}, {label: 'Au dessus de la porte', value: 'porte'}, {label: 'Sur un mur, en diagonale', value: 'diagonale'}]"
          :value.sync="detail.emplacement"
        >
          <h4>À quel endroit se situe la fissure</h4>
        </button-question>
      </div>
      <div v-if="detail.lieu === 'escalier'">
        <button-question class="mbm"
          :choices="[{label: 'Oui', value: true}, {label: 'Non', value: false}]"
          :value.sync="detail.escalierPenche"
        >
          <h4>Est-ce que l'escalier penche ?</h4>
        </button-question>
      </div>
      <div v-if="detail.lieu === 'appartement'">
        <button-question class="mbm"
          :choices="[{label: 'Oui', value: true}, {label: 'Non', value: false}]"
          :show-unknown="true"
          :value.sync="detail.murPorteur"
        >
          <h4>Est-ce que la fissure se situe sur un mur porteur ?</h4>
        </button-question>

        <button-question class="mbm"
          :choices="[{label: 'Oui', value: true}, {label: 'Non', value: false}]"
          :value.sync="detail.plusieursMurs"
        >
          <h4>Est-ce que la fissure court sur plusieurs murs ?</h4>
        </button-question>
        <button-question class="mbm"
          :choices="[{label: 'Oui', value: true}, {label: 'Non', value: false}]"
          :value.sync="detail.cloisonSol"
        >
          <h4>Est-ce que la cloison se décolle du sol ?</h4>
        </button-question>
      </div>
      <div class="btn__content mtm">
        <v-ons-button modifier="cta" @click="$emit('filled', {next: 'photos'})">Étape suivante</v-ons-button>
      </div>
    </div>
  </div>
</template>

<script>

import ButtonQuestion from './ButtonQuestion'
import shared from '../../shared.js'

export default {
  components: {
    ButtonQuestion
  },
  data () {
    return shared.answers.fissures = {
      cracks: null,
      detail: {
        lieu: undefined,
        forme: undefined,
        traversante: undefined,
        emplacement: undefined,
        escalierPenche: undefined,
        murPorteur: undefined,
        plusieursMurs: undefined,
        cloisonSol: undefined,
      }
    }
  },
  methods: {
    handle (type, value) {
      this.detail[type] = value
    }
  }
}
</script>
