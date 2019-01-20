<template>
  <v-ons-page shown>
    <h4>Votre diagnostic est terminé, voici vos résultats :</h4>
    <p>Sur la base de vos déclarations, nous pensons que :</p>
    <div class="dangerosity" :data-level="results.dangerosity">
      <div v-if="results.dangerosity === 0">Votre logement ne comporte pas de problème particulier</div>
      <div
        v-if="results.dangerosity === 1"
      >L'état de votre logement est bon, mais certaines choses sont à surveiller</div>
      <div v-if="results.dangerosity === 2">Votre logement présente des problèmes graves</div>
      <div v-if="results.dangerosity === 3">Votre logement est dangereux, vous devez agir rapidement</div>
      <div v-if="results.dangerosity === 4">Votre logement est dangereux, vous devez agir maintenant</div>
    </div>
    <div v-if="results.advices.fissures">
      <p>{{ results.advices.fissures.description }}</p>
    </div>
    <div v-if="results.dangerosity > 0">
      <p>Prochaines étapes :</p>
      <v-ons-list>
        <v-ons-list-item
          v-if="results.dangerosity === 4"
        >Vous devez impérativement notifier le syndic et le propriétaire du caractère grave et urgent de la situation, par recommandé.</v-ons-list-item>
        <v-ons-list-item
          v-if="results.dangerosity >= 4"
        >Nous vous invitons à signaler également le problème au Pôle départemental de lutte contre l'habitat indigne, qui pourra envoyer un expert :
          <ul>
            <li>
              <a
                target="_blank"
                href="http://www.bouches-du-rhone.gouv.fr/content/download/23898/144670/file/procedure%20fiche%20signalement_PDLHI.pdf"
              >Procédure</a>
            </li>
            <li>
              <a
                target="_blank"
                href="http://www.bouches-du-rhone.gouv.fr/content/download/23899/144674/file/fiche%20signalement%20PDLHI.pdf"
              >Formulaire à imprimer et envoyer</a>
            </li>
          </ul>
        </v-ons-list-item>
        <v-ons-list-item v-if="results.dangerosity >= 1">
          Consultez&nbsp;
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1XUuMWi2bAx-mDr2Qs4IXToAry91OJOO5/view"
          >le guide pratique à destination des locataire</a>.
        </v-ons-list-item>
        <v-ons-list-item v-if="results.dangerosity >= 2">
          <router-link to="/guide">Entrez en contact avec les associations de terrain</router-link>&nbsp;qui pourront vous accompagner dans vos démarches.
        </v-ons-list-item>
        <v-ons-list-item
          v-if="results.dangerosity < 4 && results.advices.fissures"
        >Tenez le syndic et le propriétaire informé en cas d'évolution de la fissure.</v-ons-list-item>
      </v-ons-list>
    </div>
    <div>
      <p>En cas de doute ou de question sur votre situation, ou pour vous faire accompagner,
        <router-link to="/guide">consultez notre guide à destination des locataires</router-link>
      </p>
    </div>
    {{ results }}
    {{ answers }}
  </v-ons-page>
</template>

<script>
import shared from '../shared.js'

export default {
  mounted() {
    console.log('results answers', this.params, this.answers)
  },
  data () {
    return {
      answers: shared.answers,
      // answers: {
      //   // insalubre: true,
      //   insalubre: true,
      //   fissures: {
      //     cracks: true,
      //     detail: {
      //       lieu: 'appartement',
      //       forme: 'droite',
      //       traversante: true,
      //       escalierPenche: false,
      //       evolutive: true,
      //       emplacement: 'fenetres',
      //       murPorteur: true,
      //       cloisonSol: true,
      //       plusieursMurs: true,
      //     }
      //   }
      // }
    };
  },
  computed: {
    results () {
      let result = {
        dangerosity: 0,
        advices: {
          fissures: null
        }
      }
      if (this.answers.insalubre) {
        result.dangerosity = 4
        return result
      }
      if (!this.answers.fissures.cracks) {
        result.dangerosity = 0
        return result
      } else {
        let d = this.answers.fissures.detail
        result.dangerosity = 1
        if (d.lieu === 'facade') {
          if (d.traversante && d.evolutive && (d.emplacement === 'fenetres' || d.emplacement === 'porte')) {
            result.dangerosity = 4
            result.advices.fissures = {
              description: "La fissure est traversante, évolue, se trouve sur un mur porteur et peut indiquer un affaissement de facade.",
            }
          } else if (d.traversante && d.evolutive) {
            result.dangerosity = 3
            result.advices.fissures = {
              description: "La fissure est traversante, évolue et se trouve sur un mur porteur.",
            }
          } else if (d.evolutive) {
            result.dangerosity = 2
            result.advices.fissures = {
              description: "La fissure a évolué et se trouve sur un mur porteur.",
            }
          } else {
            result.dangerosity = 1
            result.advices.fissures = {
              description: "La fissure n'est probablement pas grave, mais il faut surveiller son évolution.",
            }
          }
        } else if (d.lieu === 'appartement') {
          if (d.murPorteur && d.cloisonSol && d.plusieursMurs && d.evolutive && d.traversante) {
            result.dangerosity = 4
            result.advices.fissures = {
              description: "La fissure se situe sur un mur porteur est traversante, vous constatez sa présence sur plusieurs murs ainsi qu'un décollement de la cloison et du sol.",
            }
          } else if (d.traversante && d.evolutive) {
            result.dangerosity = 3
            result.advices.fissures = {
              description: "La fissure est traversante et elle évolue.",
            }
          } else if (d.traversante) {
            result.dangerosity = 2
            result.advices.fissures = {
              description: "La fissure est traversante mais elle n'évolue pas.",
            }
          } else {
            result.dangerosity = 1
            result.advices.fissures = {
              description: "La fissure n'est probablement pas grave.",
            }
          }
        } else if (d.lieu === 'escalier') {
          if (d.escalierPenche) {
            result.dangerosity = 4
            result.advices.fissures = {
              description: "La fissure se situe dans la cage d'escalier et l'escalier penche.",
            }
          } else if (d.traversante && d.evolutive) {
            result.dangerosity = 3
            result.advices.fissures = {
              description: "La fissure est traversante et elle évolue.",
            }
          } else if (d.traversante) {
            result.dangerosity = 2
            result.advices.fissures = {
              description: "La fissure est traversante mais elle n'évolue pas.",
            }
          } else {
            result.dangerosity = 1
            result.advices.fissures = {
              description: "La fissure n'est probablement pas grave, mais il faut surveiller son évolution.",
            }
          }
        }
      }
      return result
      }
  }
}
</script>
<style>
.dangerosity {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1em;
}
.dangerosity[data-level="0"] {
  color: green;
}
.dangerosity[data-level="1"] {
  color: rgb(167, 150, 0);
}
.dangerosity[data-level="2"] {
  color: orange;
}

.dangerosity[data-level="3"] {
  color: rgb(228, 73, 11);
}
.dangerosity[data-level="4"] {
  color: red;
}
</style>
