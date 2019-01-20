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
