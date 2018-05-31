const fse = require('fs-extra')
const path = require('path')
const util = require('util')
const express = require('express')
const playSound = require('play-sound')
const bodyParser = require('body-parser')

const yargs = require('yargs')
const argv = yargs
    .option('player', {alias: 'p'})
    .option('authkey', {alias: 'k'})
    .argv

const app = express()
const port = process.env.PORT || 3000
const audioPath = path.join(__dirname, 'audio')
const player = playSound({
    player: argv.player
})

if (argv.player) {
    console.log(`[INFO]\tPlayer is set to "${argv.player}" manually`);
}

if (argv.authkey) {
    console.log(`[INFO]\tAuth key "${argv.authkey}" is required`);
}

app.use(bodyParser.json({extended: false}))
app.use(bodyParser.urlencoded({extended: false}))

app.post('/play', async (req, res) => {
    let {name, type, auth} = req.body
    if (argv.authkey && auth != argv.authkey) {
        console.log(`[INFO]\tIllegal auth key: ${auth}`)
        res.status(403).end()
        return
    }
    if (!(await isAudioExist(name, type))) {
        console.log(`[WARNING]\tNot found for ${name}.${type}`)
        res.status(404).end()
        return
    }
    try {
        await util.promisify(player.play.bind(player))(getAudioPath(name, type))
    }
    catch (err) {
        res.status(500).send(err.message).end()
        console.log(`[ERROR]\t${err.message}`)
        return
    }
    res.status(200).end()
})

app.listen(port, () => console.log(`[INFO]\tServer is listening on port ${port}!`))

function isAudioExist(name, type) {
    if (!name || /\.{2,}|\//.test(name)) {
        return false
    }
    return fse.pathExists(getAudioPath(name, type))
}

function getAudioPath(name, type = 'mp3') {
    return path.join(audioPath, `${name}.${type}`)
}
