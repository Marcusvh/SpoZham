/**
 * RefreshToken for APIsangGenkendelse. its the same as in the database.
 */
const refreshToken = "AQBM02xDt4mU_XMtAyO31n7cXgtJUX5pvKHQpJCsLq6lUpShMHJzxs2lrHFoDl9EcbDpSzrB3k9DlLf_8e-2EbZiO6toe_2XRxNLI-v3nxkvhGqy8DJWsItwqLS8eBz4u7o" // DO not TOUCH
/**
 * spotify user id
 */
const userId = "1140904457"
/**
 * finds the tag we put error messages on
 */
const errorHandling = document.getElementById("error1")

/**
 * options for Shazam API call
 */
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '315041ee33mshe61d494a3c783dbp1efdb5jsnc23226708601',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
    }
};
/**
 * api call to get the lates broadcast song
 * @returns the api call
 */
async function trackID() {
    return fetch("https://spozham-rest.azurewebsites.net/api/Broadcasts")
}
/**
 *  api call to get the access token based on userID 
 * @returns the api call
 */
async function getToken() {
    return fetch('https://spozham-rest.azurewebsites.net/api/User/Spotify/Token?id=APIsangGenkendelse')
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
        axios.post(`https://spozham-rest.azurewebsites.net/api/User/Spotify/RefreshToken?id=APIsangGenkendelse&access=${data.access_token}`)   
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
     * trackTitle - ved et Shazam kald finder vi titlen p?? sangen.
     */
    let trackTitle = await shazamCall().then(response => response.json()
                            .then(data => {
                                console.log(data);
                                /**
                                 * Vi tjekker om der kommer en fejlbesked eller ej.
                                 */
                                if(data.detail != undefined) {
                                    errorHandling.parentElement.removeAttribute("hidden")
                                    errorHandling.innerHTML = "Sangen kan ikke findes"
                                } else {
                                    return data.urlparams[Object.keys(data.urlparams)[0]]
                                }
                            }))
                            console.log(trackTitle);
    /**
     * trackartist - ved et Shazam kalder finder vi artisten til sangen.
     */
    let trackArtitst = await shazamCall().then(response => response.json()
                            .then(data => {
                                /**
                                 * Vi tjekker om der kommer en fejlbesked eller ej.
                                 */
                                if(data.detail != undefined) {
                                    errorHandling.parentElement.removeAttribute("hidden")
                                    errorHandling.innerHTML = "Sangen kan ikke findes"
                                } else {
                                    return data.urlparams[Object.keys(data.urlparams)[1]]
                                }
                            }))
    /**
     * validateShazamTitle - Ved et shazam kald f??r vi titlen p?? sangen, til brug ved validering.
     */
    let validateShazamTitle = await shazamCall().then(response => response.json().then(data => data.title))

    /**
     * Vi finder sangen fra spotify api ved brug af udtr??kkene fra Shazam
     */
    axios.get('https://api.spotify.com/v1/search?'
    + `q=remaster%2520track%3A${trackTitle}%2520artist%3A${trackArtitst}`
    + '&type=track'
    + '&limit=3', options)
    .then(response => {
        console.log(response)
        document.getElementById('song').innerHTML = response.data.tracks.items[0].name
        document.getElementById('artist').innerHTML = response.data.tracks.items[0].artists[0].name
        document.getElementById('release').innerHTML = response.data.tracks.items[0].album.release_date
    })
}
ApiSearch()




/**
 * Spotify API call to find the song based on shazam details and sends the id of the song to AddSongToPlaylist()
 */
async function ApiSearchForAddingToList() {
    let options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + await getToken().then(response => response.json().then((data) => data.access))
        } 
    }
    /**
     * trackTitle - ved et Shazam kald finder vi titlen p?? sangen.
     */
    let trackTitle = await shazamCall().then(response => response.json()
                            .then(data => {
                                /**
                                 * Vi tjekker om der kommer en fejlbesked eller ej.
                                 */
                                if(data.detail != undefined) {
                                    errorHandling.parentElement.removeAttribute("hidden")
                                    errorHandling.innerHTML = "Sangen kan ikke findes"
                                } else {
                                    return data.urlparams[Object.keys(data.urlparams)[0]]
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
                                if(data.detail != undefined) {
                                    errorHandling.parentElement.removeAttribute("hidden")
                                    errorHandling.innerHTML = "Sangen kan ikke findes"
                                } else {
                                    return data.urlparams[Object.keys(data.urlparams)[1]]
                                }
                            }))
    /**
     * validateShazamTitle - Ved et shazam kald f??r vi titlen p?? sangen, til brug ved validering.
     */
    let validateShazamTitle = await shazamCall().then(response => response.json().then(data => data.title))

    /**
     * Vi finder sangen fra spotify api ved brug af udtr??kkene fra Shazam
     */
    await axios.get('https://api.spotify.com/v1/search?'
    + `q=remaster%2520track%3A${trackTitle}%2520artist%3A${trackArtitst}`
    + '&type=track'
    + '&limit=3', options)
    .then(async response => {
        console.log(response)
        document.getElementById('song').innerHTML = response.data.tracks.items[0].name
        document.getElementById('artist').innerHTML = response.data.tracks.items[0].artists[0].name
        document.getElementById('release').innerHTML = response.data.tracks.items[0].album.release_date
        AddSongToPlaylist(response.data.tracks.items[0].id)
    })
}


/**
 * laver et api kald til spotify hvor vi l??gger en sang i en playliste
 * input: Modtaget et track_id, string
 * output: ved sucess intet, ved fejl printes en fejlmelding. 
 */
async function AddSongToPlaylist(track_id) {
    let playlistID = document.getElementById("AllPlaylists").value
    console.log(playlistID);

    await fetch(`https:api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + await getToken().then(response => response.json().then((data) => data.access))
        },
        body: JSON.stringify({
            "uris": [`spotify:track:${track_id}`]
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        

    /**
     * hvis der kommer et snapshot_id som response, s?? fjerne vi hidden fra den div hvor beskeden ligger i, samt sender en besked med
     */
        if('snapshot_id' in data == true){
            document.getElementById('success').removeAttribute('hidden')
            document.getElementById('successText').innerHTML = `Sangen blev tilf??jet til playlisten`
        }
        /**
         * hvis der er en fejlbesked med status koden 400 som response, s?? fjerner vi hidden fra den div hvor fejl beskeden ligger i, samt sender en besked med
         */
        if(data.error.status == '400'){
            document.getElementById('error2').removeAttribute("hidden")
            document.getElementById('error1').innerHTML = 'Der er sket en fejl. Sangen blev ikke tilf??jet :('
        }
        
        
    })
}