Twitter = require 'twitter'

client = new Twitter
  consumer_key: 'zTy4muqNppEUScosnJBA'
  consumer_secret: '0yFGyvV7Lxgr2MXIKUWRp0riCmr5q8MI8np0xgGoGEE'
  access_token_key: '21945870-aKBa5V9uy6wcnSCcF0YVlg9AHWVn9AJD6XkRE8MnI'
  access_token_secret: 'ZkXQKcblNUZIzboV9ujMxp6U8ZevP2YkFzRncQpDE'

params =
  screen_name: 'nodejs'

# client.get 'geo/search',
#   lat: 43.2923576651113
#   long: 5.383435562252999
#   query: 'balancetontaudis'
#   accuracy: '5000m'
#   (args...) ->
#     console.log args...

client.get 'search/tweets',
  q: '#balancetontaudis filter:media geocode:43.292357,5.3834355,5km'#'#balancetontaudis filter:media'#'geocode=43.292357,5.3834355,5km' #balancetontaudis ',
  # result_type: 'popular'
  (error, tweets, response) ->
    console.log 'balancetontaudis', tweets.statuses.map (t) -> t.text
