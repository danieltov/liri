var asciify = require("asciify");
const chalk = require('chalk');
asciify(`Loading...`, function (err, res) {
    console.log(chalk.yellow.bgRed.bold(res));
});

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};