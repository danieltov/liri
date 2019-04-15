// requires
require('dotenv').config();
const keys = require('./keys.js');
const asciify = require('asciify');
const chalk = require('chalk');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

// bindings
const log = console.log;

// spotify-this
const spotifyThis = () => {
    const trigger = 'spotify-this-song';
    let song = process.argv.slice(3).join(' ');

    // if user doesn't pass a song, default to 'the sign'
    if (song.length === 0) song = 'the sign';

    if (process.argv[2] === trigger) {
        // call spotify search with promise
        spotify
            .search({
                type: 'track',
                query: song,
                limit: 10
            })
            .then(function(response) {
                const data = response.tracks.items;

                asciify(song, function(err, res) {
                    log(chalk.yellow.bgRed.bold(res));
                });

                for (let i = 0; i < data.length; i++) {
                    log(`Artist: ${data[i].album.artists[0].name}`);
                    log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
                    log(`Song: ${data[i].name}`);
                    log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
                    log(`Album: ${data[i].album.name}`);
                    log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
                    if (data[i].preview_url === null) {
                        log(chalk.bgRed.white.bold(`Preview Not Available`));
                    } else {
                        log(
                            chalk.white.bgBlue.bold(
                                `Preview: ${data[i].preview_url}`
                            )
                        );
                    }
                    log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }
};

spotifyThis();

module.exports = { spotifyThis };
