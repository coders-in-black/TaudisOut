export default {
  init() {
    this.answers = {
      insalubre: null,
      fissures: {}
    }
    this.address = null
    this.location = null
    this.images = [ null ]
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
  payload() {
    return {
      images: this.images.filter(image => image),
      location: this.location,
      address: this.address,
      questions: this.prepareAnswers()
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
