// requires
const axios = require('axios');
const asciify = require('asciify');
const chalk = require('chalk');
const moment = require('moment');
const NodeGeocoder = require('node-geocoder');

// package inits
const options = {
    provider: 'mapquest',
    apiKey: 'yz48iN01403dMKIi7gPZatzdQJX2QZaf'
};
const geocoder = NodeGeocoder(options);
moment().format();

// bindings
const trigger = 'concert-this';
const log = console.log;
let concertData, locData, logger;

function fetchConcerts() {
    let artist = process.argv.slice(3).join(' ');
    let query = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    return new Promise(function(resolve, reject) {
        axios
            .get(query)
            .then(function(response) {
                resolve((concertData = response.data));
            })
            .catch(function(error) {
                reject(log(error));
            });
    });
}

async function concertThis() {
    await fetchConcerts();
    log('\n\n\n');
    log('Upcoming Concerts for');
    asciify(`${process.argv.slice(3).join(' ')}`, function(err, res) {
        log(chalk.yellow.bgRed.bold(res));
    });
    if (concertData.length === 0) {
        asciify('not on tour :(', function(err, res) {
            log(chalk.yellow.bgRed.bold(res));
        });
    } else {
        for (let i = 0; i <= 20; i++) {
            geocoder
                .reverse({
                    lat: concertData[i].venue.latitude,
                    lon: concertData[i].venue.longitude
                })
                .then(function(res) {
                    locData = res[0];
                    logger =
                        `\nWhen: ${moment(concertData[i].datetime).format(
                            'dddd, MMMM Do YYYY, h:mm a'
                        )}` +
                        chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n') +
                        `\nWhere: ${concertData[i].venue.name} at ${
                            locData.streetName
                        } ${locData.city}, ${locData.stateCode} ` +
                        chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n') +
                        `\nTickets: ${concertData[i].offers[0].status}` +
                        chalk.white.bgBlue.bold(
                            `\nBuy Tickets: ${concertData[i].offers[0].url}`
                        ) +
                        chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n') +
                        `\nEvent Page: ${concertData[i].url}` +
                        chalk.red.bold('\n+-+-+-+-+-+-+-+-+-+-+-+\n');
                    log(logger);
                })
                .catch(function(err) {
                    log(err);
                });
        }
    }
}

if (process.argv[2] === trigger) {
    concertThis();
}

module.exports = { fetchConcerts, concertThis };
