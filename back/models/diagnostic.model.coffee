config    = require '../config'
mongoose  = require "mongoose"
Schema    = mongoose.Schema

DiagTypes = [
    'fissures'
    'humidité'
]

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
    images: [ String ]
    questions: [
        type:
            type: String
            enum: DiagTypes
        q: String
        a: String
    ]
    diagnostic: [
       type:
            type: String
            enum: DiagTypes
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