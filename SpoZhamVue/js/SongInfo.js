/**
 * RefreshToken for APIsangGenkendelse. its the same as in the database.
 */
const refreshToken = "AQBM02xDt4mU_XMtAyO31n7cXgtJUX5pvKHQpJCsLq6lUpShMHJzxs2lrHFoDl9EcbDpSzrB3k9DlLf_8e-2EbZiO6toe_2XRxNLI-v3nxkvhGqy8DJWsItwqLS8eBz4u7o" // DO not TOUCH

const errorHandling = document.getElementById("error1")
/**
 * options for Shazam API call
 */
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7d5f825e8cmsh2e6564aa7cd50fcp1a2b19jsn802b5c2088b1',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
    }
};
/**
 * api call to get the lates broadcast song
 * @returns the api call
 */
async function trackID() {
    return fetch("http://localhost:5204/api/Broadcasts")
}
/**
 *  api call to get the access token based on userID 
 * @returns the api call
 */
async function getToken() {
    return fetch('http://localhost:5204/api/User/Spotify/Token?id=APIsangGenkendelse')
}

/**
 * uses the newest shazam track id and gets the details for the song 
 */
async function shazamCall () {
    return fetch(`https://shazam-core.p.rapidapi.com/v1/tracks/details?`
    + `track_id=${await trackID().then((response) => response.json()).then((data) => data) }`
    // + `track_id=218ueiow12`
    , options)
}


/**
 * uses the refreshToken to get a new access token and post it to the database
 */
async function GetAndPostToken() {
    fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic ZDU3MjdjZDUxZmRkNGY5NWFmMWE3NGI0YzUwODdkOTI6ZDMwMWMxOWMyM2YyNGM0Y2IwZjFjM2YwNjk1NjQ1Mjk="
            },
            body: new URLSearchParams({
                "grant_type": "refresh_token",
                "refresh_token": refreshToken
            })
        })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        axios.post(`http://localhost:5204/api/User/Spotify/RefreshToken?id=APIsangGenkendelse&access=${data.access_token}`)   
            .then(response => {
                console.log(response);
            })
    })
} GetAndPostToken()

/**
 * Spotify API call to find the song based on shazam details
 */
async function ApiSearch() {
    let options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + await getToken().then(response => response.json().then((data) => data.access))
        } 
    }
    /**
     * trackTitle - ved et Shazam kald finder vi titlen på sangen.
     */
    let trackTitle = await shazamCall().then(response => response.json()
                            .then(data => {
                                /**
                                 * Vi tjekker om der kommer en fejlbesked eller ej.
                                 */
                                if(data.detail.length == 1) {
                                    errorHandling.innerHTML = "Sangen kan ikke findes"
                                } else {
                                    data.urlparams[Object.keys(data.urlparams)[0]]
                                }
                            }))
    /**
     * trackartist - ved et Shazam kalder finder vi artisten til sangen.
     */
    let trackArtitst = await shazamCall().then(response => response.json()
                            .then(data => {
                                /**
                                 * Vi tjekker om der kommer en fejlbesked eller ej.
                                 */
                                if(data.detail.length == 1) {
                                    errorHandling.innerHTML = "Sangen kan ikke findes"
                                } else {
                                    data.urlparams[Object.keys(data.urlparams)[1]]
                                }
                            }))

    /**
     * validateShazamTitle - Ved et shazam kald får vi titlen på sangen, til brug ved validering.
     */
    let validateShazamTitle = await shazamCall().then(response => response.json().then(data => data.title))

    /**
     * Vi finder sangen fra spotify api ved brug af udtrækkene fra Shazam
     */
    // await axios.get('https://api.spotify.com/v1/search?'
    // + `q=remaster%2520track%3A${trackTitle}%2520artist%3A${trackArtitst}`
    // + '&type=track'
    // + '&limit=3', options)
    // .then(async response => {
    //     console.log(response)
    //     if(response.data.tracks.items[0].name != validateShazamTitle) {
    //         errorHandling.innerHTML = "titlen matcher ikke på spotify og shazam. måske er det ikke den rigtige sang"
    //     }


        
    // })
}
// ApiSearch()