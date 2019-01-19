mongoose  = require "mongoose"
Schema    = mongoose.Schema

DiagnosticSchema = new Schema
    location:
        type:
            type: String
            enum: ['Point']
            default: 'Point'
            required: true
        coordinates:
            type: [Number]
            required: true
    address: String
    images: [
        url: String
        public: type: Boolean
    ]
    questions: [
        q: String
        a: String
    ]
    diagnostic: [
       type:
            type: String
            enum: [
                'fissure'
                'humidité'
            ]
        severity:
            type: String
            enum: [
                'confort'
                'indecency'
                'unhealthy'
                'urgence'
            ]
    ]
    resolution_process: [

    ]

    status:
        type: String
        enum: [
            'DiagnosticPending'
            'DiagnosticCompleted'
            'WorksPending'
            'WorksDone'
            'Solved'
        ]
    public:
        type: Boolean


DiagnosticSchema.methods.toAPI = ->
    @toObject()

module.exports = Diagnostic = mongoose.model 'Diagnostic', DiagnosticSchema