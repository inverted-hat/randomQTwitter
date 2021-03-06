const fileUtils = require('./fileUtils.js');
const episodesUtils = require('./episodesUtils.js');
const twitterConfig = require('./twitterConfig');
const twitterUtils = require('./twitterUtils.js');
const episodesFilePath = `${__dirname}/../data/episodes.json`;

fileUtils.readFile(episodesFilePath).then(content => {
    const episodes = episodesUtils.resetEpisodesWhenAllHaveBeenPosted(JSON.parse(content).episodes);
    const randomEpisode = episodesUtils.getRandomUnPostedEpisode(episodes);

    twitterUtils.init(twitterConfig);
    twitterUtils.postStatus({ status: `Folge ${randomEpisode.number} ${randomEpisode.title} #DreiFragezeichen` })
        .then(data => {
            console.log(data);

            const updatedEpisodes = episodesUtils.markEpisodeAsPosted(episodes, randomEpisode.number);

            fileUtils.writeFile(episodesFilePath, JSON.stringify({episodes: updatedEpisodes}))
                .then(() => console.log('updated episodes.json'));
        }, error => console.log(error));
});