const root = process.env.SERVER_URL || 'https://pilotosapp.herokuapp.com/api/v1' //'http://127.0.0.1:8080/api/v1'
const fetch = require("node-fetch")
const pilotosRoot = root+'/pilotos'
const examplePiloto =  {
    "pilotoId": "59",
    "name": "Leonardo",
    "surname": "Dal Ronco",
    "bike": "Oxford"
}
// importante per il TEST COVERAGE!
// const server = require('./server');

// helper methods - you can put these  in a separate file if you have many tests file and want to reuse them

const postPilotos = function (newPiloto) {
    return fetch(pilotosRoot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newPiloto)
    })
}

const putPilotos = function (pilotoId, piloto) {
    return fetch(pilotosRoot+'/'+pilotoId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(piloto)
    })
}

const deletePilotos = function (pilotoId) {
    return fetch(pilotosRoot+'/'+pilotoId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}


const getManyPilotos = function () {
    return fetch(pilotosRoot, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
}

const getOnePiloto = function (pilotoId) {
    return fetch(pilotosRoot+'/'+pilotoId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
}



test('basic post and get single element', () => {
  return postPilotos(examplePiloto)
    .then(postResponse => { return postResponse.json() })
    .then(postResponseJson => {
      examplePiloto.pilotoId = postResponseJson.pilotoId
      return getOnePiloto(examplePiloto.pilotoId)
    })
    .then(getResponse => {return getResponse.json()})
    .then(jsonResponse => {expect(jsonResponse.pilotoResult).toEqual(examplePiloto.pilotoResult)})
    //.catch(e => {console.log(e)})
});

// importante! Mettere la PUT prima della DELETE!
test('put item by pilotoId - basic response', () => {
  return putPilotos(examplePiloto.pilotoId, examplePiloto)
    .then(response => { expect(response.status).toBe(200) })
    //.catch(e => {console.log(e)})
});

test('delete by pilotoId - basic response', () => {
  return deletePilotos(examplePiloto.pilotoId)
    .then(response => { expect(response.status).toBe(200) })
    //.catch(e => {console.log(e)})
});

test('get all pilotos - basic response', () => {
  return getManyPilotos()
    .then(response => { expect(response.status).toBe(200) })
    //.catch(e => {console.log(e)})
});


/*
test('delete by pilotoID - item actually deleted', () => {
  return getOnePiloto(examplePiloto.pilotoId)
    .then(res => {expect(res.status).toBe(404)})
    //.catch(e => {console.log(e)})
});
*/
