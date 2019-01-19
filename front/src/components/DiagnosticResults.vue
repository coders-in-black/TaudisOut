<template>
  <div>Votre diagnostic est terminé, voici vos résultats :
    {{answers}}
  </div>
</template>

<script>
import shared from '../shared.js'

export default {
  mounted() {
    console.log('results answers', this.params, this.answers)
  },
  data () {
    return {
      answers: shared.answers
    };
  }
}
</script>
