import express from 'express'

const app = express()

app.get('/games', (req, res) => {
  return res.json([])
})

app.post('/ads', (req, res) => {
  return res.status(201).json([])
})

app.get('/games/:id/ads', (req, res) => {
  // const gameId = req.params.id
  return res.json([
    { id: 1, name: 'Anuncio 1' },
    { id: 2, name: 'Anuncio 2' },
    { id: 3, name: 'Anuncio 3' },
    { id: 4, name: 'Anuncio 4' },
  ])
})

app.get('/ads/:id/discord', (req, res) => {
  // const adsId = req.params.id
  return res.json([])
})

app.listen(3333, () => console.log('Api is running on port: 3333'))
