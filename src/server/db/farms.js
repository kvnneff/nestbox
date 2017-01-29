// var sortBy = require('sort-by')
let db = null

const init = (dbInstance) => {
  db = dbInstance
}

// function metersToMiles (meters) {
//   return meters * 0.000621371192
// }

function milesToMeters (miles) {
  return miles * 1609.344
}

/**
 * Save to the database and return the farm id.
 * @param  {Object}   farm
 * @param  {Function} cb
 * @return {Number}
 */
const save = (farm, cb) => {
  const values = [
    farm.user_id,
    farm.name,
    farm.email,
    farm.description,
    farm.street,
    farm.city,
    farm.state,
    farm.zipcode,
    farm.is_public,
    farm.available,
    farm.price,
    farm.drive_up,
    farm.free_range,
    farm.organic,
    farm.latitude,
    farm.longitude
  ]
  db.upsertLocation(values, function (err, results) {
    if (err) return cb(err)
    return cb(null, results[0])
  })
}

/**
 * Remove a farm from the database
 * @param  {[type]}   id [description]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
function remove (user_id, cb) {
  db.farms.destroy({ user_id }, function (err, results) {
    if (err) return cb(err)
    return cb(null, results)
  })
}

/**
 * Find a single farm with `id`
 * @param  {Number|String}   id
 * @param  {Function} cb
 * @return {Object}
 */
const find = (user_id, cb) => {
  db.farms.find({ user_id }, function (err, results) {
    if (err) return cb(err)
    return cb(null, results[0] ? results[0] : null)
  })
}

const findFarm = (farm_id, cb) => {
  db.farms.find({ farm_id }, function (err, results) {
    if (err) return cb(err)
    return cb(null, results[0] ? results[0] : null)
  })
}

const findWithinRadius = (latitude, longitude, radius, cb) => {
  var values = [latitude, longitude, milesToMeters(radius)]
  db.findWithinRadius(values, function (err, results) {
    if (err) return cb(err)
    const rows = results.length ? results : []
    return cb(null, rows)
  })
}

const findRecent = (cb) => {
  db.farms.find({}, { limit: 20, order: 'created_at' }, (err, collection) => {
    if (err) return cb(err)
    return cb(null, collection)
  })
}

const findByName = (name, cb) => {
  db.findByName([name], (err, results) => {
    if (err) return cb(err)
    const rows = results.length ? results : []
    return cb(null, rows)
  })
}

module.exports = {
  findWithinRadius,
  findFarm,
  findByName,
  findRecent,
  find,
  remove,
  save,
  init
}
