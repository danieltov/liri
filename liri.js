// global 
// requires
require("dotenv").config();
const chalk = require('chalk');
const keys = require("./keys.js");

// variables
const log = console.log;

// concert-this

// requires
const axios = require("axios");
const asciify = require("asciify");
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
const concert = "concert-this";
let concertData, locData;

if (process.argv[2] === concert) {


    function fetchConcerts() {
        let artist = process.argv.slice(3).join(" ");
        let query = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

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
        let concerts = await fetchConcerts();

        log("\n\n\n");
        log("Upcoming Concerts for")
        asciify(`${concertData[0].lineup[0]}`, function (err, res) {
            log(chalk.yellow.bgRed.bold(res));
        });

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

    concertThis();
};