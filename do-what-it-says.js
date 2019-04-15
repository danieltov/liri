//requires
const fs = require('fs'),
    concert = require('./concert-this.js'),
    spotify = require('./spotify-this-song.js'),
    movie = require('./movie-this.js');

let trigger = 'do-what-it-says';

if (process.argv[2] === trigger) {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        let arr = data.split(',');
        process.argv[2] = arr[0];
        process.argv[3] = arr[1];

        switch (arr[0]) {
            case 'spotify-this-song':
                spotify.spotifyThis();
                break;
            case 'movie-this':
                movie.movieThis();
                break;
            case 'concert-this':
                concert.fetchConcerts();
                concert.concertThis();
                break;
            default:
                return;
        }
    });
}
