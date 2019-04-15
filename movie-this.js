//requires
const asciify = require('asciify');
const chalk = require('chalk');
const axios = require('axios');

// bindings
const trigger = 'movie-this';
const log = console.log;

function movieThis() {
    let title = process.argv.slice(3).join(' ');
    if (title.length > 15) {
        log(chalk.bgRed.yellow.bold(`\n\n${title}\n`));
    } else {
        asciify(title, function(err, res) {
            log(chalk.yellow.bgRed.bold(res));
        });
    }

    let movie = process.argv.slice(3).join('+');
    let queryUno = `http://www.omdbapi.com/?t=${movie}&apikey=trilogy`;

    axios
        .get(queryUno)
        .then(function(response) {
            let data = response.data;

            log(`Year: ${data.Year}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
            log(`Plot: ${data.Plot}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
            log(`Actors: ${data.Actors}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
            log(`Box Office: ${data.BoxOffice}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
            log(`IMDB Rating: ${data.imdbRating}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
            log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
            log(`Awards: ${data.Awards}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
            log(`Country: ${data.Country}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
            log(`Language: ${data.Language}`);
            log(chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n'));
        })
        .catch(function(error) {
            console.log(error);
        });
}

if (process.argv[2] === trigger) {
    movieThis();
}

module.exports = { movieThis };
