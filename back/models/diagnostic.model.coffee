config    = require '../config'
mongoose  = require "mongoose"
Schema    = mongoose.Schema
_ = require 'lodash'

DiagTypes = [
    'insalubre'
    'fissures'
    'humidité'
]

DiagSeverity = [
    'confort'
    'indecency'
    'unhealthy'
    'urgence'
]

Statuses = [
    'DiagnosticPending'
    'DiagnosticCompleted'
    'WorksPending'
    'WorksDone'
    'Solved'
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
    diagnostic:
        severity:
            type: String
            enum: DiagSeverity
        types: [
            type:
                    type: String
                    enum: DiagTypes
                severity:
                    type: String
                    enum: DiagSeverity
            ]
    resolution_process: [

    ]

    status:
        type: String
        enum: Statuses
    public:
        type: Boolean


DiagnosticSchema.methods.toAPI = (mode = 'list') ->
    switch mode
        when 'detail'
            to_ret = @toObject()
            to_ret.diagnostic.severity = _.sample DiagSeverity
            to_ret.status = _.sample Statuses[0..1]
            to_ret
        when 'list'
            {
                @_id
                @location
                @images
                @questions
                diagnostic:
                    severity: _.sample DiagSeverity
                status: _.sample Statuses[0..1]
            }

module.exports = Diagnostic = mongoose.model 'Diagnostic', DiagnosticSchema