// concert-this

// requires
const axios = require("axios");
const asciify = require("asciify");
const chalk = require('chalk');
const moment = require('moment');
const NodeGeocoder = require("node-geocoder");

// package inits
const options = {
    provider: "mapquest",
    apiKey: "yz48iN01403dMKIi7gPZatzdQJX2QZaf"
};
const geocoder = NodeGeocoder(options);
moment().format();

// bindings
const trigger = "concert-this";
const log = console.log;
let concertData, locData;
let artist = process.argv.slice(3).join(" ");
let query = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

if (process.argv[2] === trigger) {


    function fetchConcerts() {

        return new Promise(function (resolve, reject) {
            axios.get(query).then(function (response) {
                    resolve(concertData = response.data);
                })
                .catch(function (error) {
                    reject(log(error));
                });
        })
    }

    async function concertThis() {
        await fetchConcerts();
        log("\n\n\n");
        log("Upcoming Concerts for")
        asciify(artist, function (err, res) {
            log(chalk.yellow.bgRed.bold(res));
        });
        if (concertData.length === 0) {
            asciify('is not on tour', function (err, res) {
                log(chalk.yellow.bgRed.bold(res));
            });
        } else {

            for (let i = 0; i <= 20; i++) {
                geocoder.reverse({
                        lat: concertData[i].venue.latitude,
                        lon: concertData[i].venue.longitude
                    }).then(function (res) {
                        locData = res[0]
                        log(`When: ${moment(concertData[i].datetime).format("dddd, MMMM Do YYYY, h:mm a")}`)
                        log(chalk.red.bold("\n+-+-+-+-+-+-+-+-+-+-+-+\n"))
                        log(`Where: ${concertData[i].venue.name} at ${locData.streetName} ${locData.city}, ${locData.stateCode} `)
                        log(chalk.red.bold("\n+-+-+-+-+-+-+-+-+-+-+-+\n"))
                        log(`Tickets: ${concertData[i].offers[0].status}`);
                        if (concertData[i].offers[0].status === "available") {
                            log(chalk.white.bgBlue.bold(`Buy Tickets: ${concertData[i].offers[0].url}`));
                        };
                        log(chalk.red.bold("\n+-+-+-+-+-+-+-+-+-+-+-+\n"))
                        log(`Event Page: ${concertData[i].url}`)
                        log(chalk.red.bold("\n+-+-+-+-+-+-+-+-+-+-+-+\n"))
                    })
                    .catch(function (err) {
                        log(err);
                    })
            }
        }

    }

    concertThis();
};