import config from './config'

export default {
  init() {
    this.answers = {
      insalubre: null,
      fissures: {}
    }
    this.address = null
    this.location = null
    this.images = [ null ]
    this.results = null
  },
  questionsMap: {
    insalubre: {
      q: 'Insalubre',
      a: {
        'true': 'Oui',
        'false': 'Non',
        'null': 'Ne sais pas'
      }
    },
    cracks: {
      q: 'Fissures',
      a: {
        'true': 'Oui',
        'false': 'Non',
        'null': 'Ne sais pas'
      },
    },
    lieu: {
      q: 'Endroit',
      a: {
        'facade': 'Sur la facade',
        'escalier': 'Dans la cage d\'escalier',
        'appartement': 'Dans un appartement'
      }
    },
    forme: {
      q: 'Frome',
      a: {
        escalier: 'En escalier',
        droite: 'Droite',
        'null': 'Ne sais pas'
      }
    },
    traversante: {
      q: 'Traversante',
      a: {
        'true': 'Oui',
        'false': 'Non'
      }
    },
    evolutive: {
      q: 'Evolutive',
      a: {
        'heure': 'Ces dernières heures',
        'jour': 'Ces derniers jours',
        'mois': 'Ces derniers mois',
        'false': 'Non'
      }
    },
    emplacement: {
      q: 'Emplacement',
      a: {
        'fenetres': 'Sous les fenêtres',
        'porte': 'Au dessus de la porte',
        'diagonale': 'Sur un mur, en diagonale'
      }
    },
    escalierPenche: {
      q: 'Escalier penche',
      a: {
        'true': 'Oui',
        'false': 'Non'
      }
    },
    murPorteur: {
      q: 'mur porteur',
      a: {
        'true': 'Oui',
        'false': 'Non',
        'null': 'Ne sais pas'
      }
    },
    plusieursMurs: {
      q: 'Pluseiurs murs',
      a: {
        'true': 'Oui',
        'false': 'Non'
      }
    },
    cloisonSol: {
      q: 'cloison se décolle du sol',
      a: {
        'true': 'Oui',
        'false': 'Non'
      }
    }
  },
  toView(diagnostic_detail) {
    diagnostic_detail.images = diagnostic_detail.images.map(img => config.http.api + '/' + img)
    if (diagnostic_detail.questions)
      diagnostic_detail.questions = _.chain(diagnostic_detail.questions)
          .groupBy('type')
          .mapValues( (questions) => {
            return _.chain(questions)
              .map(({q, a}) => {
                if (typeof a === 'undefined') return
                if (this.questionsMap[q]) {
                  if (this.questionsMap[q].a) a = this.questionsMap[q].a[a]
                  q = this.questionsMap[q].q
                }
                return q + ' ? ' + a
              })
              .compact()
              .value()
          })
          .value()
    return diagnostic_detail
  },
  prepareAnswers() {
    return _.chain(this.answers)
      .toPairs()
      .filter(1)
      .tap(console.log)
      .map( ([diag_type, diag_answers]) =>
        _.chain(diag_answers).keys().without('detail').map((q) => {
          return {
            type: diag_type,
            q,
            a: diag_answers[q]
          }
        })
        .tap(console.log)
        .value()
        .concat(
          _.map(diag_answers.detail, (a, q) => {
            return {
              type: diag_type,
              q,
              a
            }
          })
        )
      )
      .flatten()
      .tap(console.log)
      .value()
  },
  prepareDiagnostic() {
    let severities = [
      'confort',
      'indecency',
      'unhealthy',
      'urgence',
      'urgence',
    ]

    return {
      severity: severities[this.diagnostic.dangerosity],
      types: [
        {
          type: 'fissures',
          severity: severities[this.diagnostic.dangerosity]
        }
      ],
      status: 'DiagnosticCompleted'
    }
  },
  payload() {
    return {
      images: this.images.filter(image => image),
      location: this.location,
      address: this.address,
      questions: this.prepareAnswers(),
      diagnostic: this.prepareDiagnostic()
    }
  },
  images: [ null ],
  answers: {
    insalubre: null,
    fissures: {}
  },
  location: null,
  address: null
}
