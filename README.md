# LIRI - Language Interpretation and Recognition Interface

LIRI is my first Node CLI. It accepts four commands: `concert-this`, `spotify-this-song`, `movie-this`, and `do-what-it-says`. The first three commands accept arguments, while the last one is a wildcard.

### concert-this

This command accepts a music artist's name as an argument. An example command line call would be: `> node liri concert-this vampire weekend`
This will output any upcoming concert information from the band "vampire weekend", using the Bands In Town API.

### spotify-this-song

This command accepts a song title as an argument. An example command line call would be: `> node liri spotify-this-song harmony hall`
This will output any information from the song "harmony hall", using the Spotify API.

### movie-this

This command accepts a movie name as an argument. An example command line call would be: `> node liri movie-this get out`
This will output any information from the movie "get out", using the OMDB API.

### do-what-it-says

This command will return a pre-determined set in formation, as specified in `random.txt`. An example command line call would be `> node liri do-what-it-says`

### TODOs:

Print program output into a `log.txt` file.
