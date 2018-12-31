module.exports = {
    getRandomUnPostedEpisode: episodes => {
        const notPostedEpisodes = episodes.filter(episode => !episode.posted);

        if (notPostedEpisodes.length === 0) {
            return [];
        } else {
            const randomIndex = Math.floor(Math.random() * notPostedEpisodes.length);
            return notPostedEpisodes[randomIndex];
        }
    }
};