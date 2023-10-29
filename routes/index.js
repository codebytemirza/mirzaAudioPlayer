const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/play', async (req, res) => {
    const youtubeURL = req.query.url;
    const audioURL = await getAudioURL(youtubeURL);
    res.render('player', { audioURL });
});

async function getAudioURL(youtubeURL) {
    try {
        const info = await ytdl.getInfo(youtubeURL);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        if (audioFormats.length === 0) {
            throw new Error('No audio formats available for the given YouTube video.');
        }
        return audioFormats[0].url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = router;
