config     = require './config'
bodyParser = require 'body-parser'
express    = require 'express'
cors       = require 'cors'
request    = require 'request-promise'
_          = require 'lodash'
imgDataUri = require 'image-data-uri'
fs         = require 'fs-extra'
models     = require './models'

app = express()

app.use cors()

app.use express.static('data')

app.use bodyParser.json({ limit: '20Mb' })

app.get '/poi', (req, res) ->
  pois = await models.Diagnostic.find()

  res.json
    result: 'success'
    data: _.invokeMap pois, 'toAPI'

app.post '/diagnostic', (req, res) ->
  {
    location
    address
    images
    questions
  } = req.body

  diag = new models.Diagnostic {
    location:
      coordinates: [location.lat, location.lng]
    address
    questions
  }

  for image, idx in images
    img = imgDataUri.decode image
    extension = _.last img.imageType.split('/')
    filename = diag._id + '-' + idx + '.' + extension
    console.log image.length, image[0..15]
    console.log 'img', img.imageType
    await fs.writeFile config.data.dir + "/" + filename, img.dataBuffer
    diag.images.push filename

  await diag.save()

  res.json
    result: 'success'
    data: diag.toAPI()

app.post '/reverse_geocoding', (req, res) ->
  {location} = req.body
  console.log 'location', location
  response = await request
    url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=#{location.lat},#{location.lng}&key=#{process.env.GOOGLE_GEOCODE_KEY}"
    json: true
  console.log 'response', response.results
  res.json _.uniq response.results?.map (r) -> r?.formatted_address

port = process.env.PORT or config.http.port
app.listen port, ->
  console.log "server is running on PORT : #{port}"
