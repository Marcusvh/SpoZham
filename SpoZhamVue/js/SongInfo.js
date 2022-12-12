const refreshToken = "AQBM02xDt4mU_XMtAyO31n7cXgtJUX5pvKHQpJCsLq6lUpShMHJzxs2lrHFoDl9EcbDpSzrB3k9DlLf_8e-2EbZiO6toe_2XRxNLI-v3nxkvhGqy8DJWsItwqLS8eBz4u7o" // DO not TOUCH

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0f6eff705dmshf162a9814c66ba5p13b8c4jsnef8afa48c048',
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
    fetch(`https://shazam-core.p.rapidapi.com/v1/tracks/details?`
    + `track_id=${await trackID().then((response) => response.json()).then((data) => data) }`
    // + 'track_id=491697169'
    , options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
    .catch(err => console.error(err));
}
// shazamCall()



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
            // "Authorization": "Bearer " + await getToken().then(response => response.json().then((data) => data.access))
            "Authorization": "Bearer " + await getToken().then(response => response.json().then((data) => data.access))
        } // token scope giver problemmer. nogle sange kan kun blive fundet uden (playlist-modify-private playlist-modify-public) som scope
    }

    axios.get('https://api.spotify.com/v1/search?'
    + 'q=remaster%2520track%3APerfect%2520Views%2520artist%3ARouge%2520album%3AEarth-EP'
    // + 'q=remaster%2520track%3ALittle%2520Too%2520Close%2520artist%3AWRLD%2CVeronika%2520Redd%2520album%3AChase%2520It'
    // + 'q=remaster%2520track%3ABlueming%2520artist%3AIU%2520album%3ALove%2520poem%2520genre%3AKpop%2520year%3A2019'
    + '&type=track'
    + '&limit=3', options)
    .then(response => console.log(response))
}
ApiSearch()
