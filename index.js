const fse = require('fs-extra')
const path = require('path')
const util = require('util')
const express = require('express')
const playSound = require('play-sound')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
const audioPath = path.join(__dirname, 'audio')
const player = playSound({})

app.use(bodyParser.json({extended: false}))
app.use(bodyParser.urlencoded({extended: false}))

app.post('/play', async (req, res) => {
    let {name, type} = req.body
    if (!(await isAudioExist(name, type))) {
        res.status(404).end()
        return
    }
    try {
        await util.promisify(player.play.bind(player))(getAudioPath(name, type))
    }
    catch (err) {
        res.status(500).send(err.message).end()
        return
    }
    res.status(200).end()
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`))

function isAudioExist(name, type) {
    if (!name || /\.{2,}|\//.test(name)) {
        return false
    }
    return fse.pathExists(getAudioPath(name, type))
}

function getAudioPath(name, type = 'mp3') {
    return path.join(audioPath, `${name}.${type}`)
}
