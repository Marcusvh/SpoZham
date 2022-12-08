const options = {
<<<<<<< HEAD
     method: 'GET',
     headers: {
         'X-RapidAPI-Key': '0f6eff705dmshf162a9814c66ba5p13b8c4jsnef8afa48c048',
         'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
     }
 };

 var trackId

 fetch("http://localhost:5204/api/")



 fetch('https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=491697169', options)
     .then(response => response.json())
     .then(response => {
         console.log(response)
       
     })
     .catch(err => console.error(err));
=======
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0f6eff705dmshf162a9814c66ba5p13b8c4jsnef8afa48c048',
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
    }
};

async function trackID() {
    return fetch("http://localhost:5204/api/Broadcasts")
}



// track_id=491697169

fetch(`https://shazam-core.p.rapidapi.com/v1/tracks/details?`
// + `track_id=${await trackID().then((response) => response.json()).then((data) => data) }`
+ 'track_id=491697169'
, options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
    .catch(err => console.error(err));




    
let accessToken = "BQBFFbfgYutzU6UI4McCxdOIRPFlGEiEwEcMti9uJC8_rQ_ebKSATDHNQVqJC0mhGA8hZmHa--uzAko4Etxw7NW7wBL2FPvXRdUbEyLPMmQQkMzijxszcV8IX8YpTV8ETttysPKXQxZP2AmWXWiDiIbfdDmhvVKqqnSjB8hzejfnrT0zUD2BJXPO3w"

const refreshToken = "AQBM02xDt4mU_XMtAyO31n7cXgtJUX5pvKHQpJCsLq6lUpShMHJzxs2lrHFoDl9EcbDpSzrB3k9DlLf_8e-2EbZiO6toe_2XRxNLI-v3nxkvhGqy8DJWsItwqLS8eBz4u7o" // DO not TOUCH


async function ApiSearch(access=accessToken) {

    let options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access
        } // token scope giver problemmer. nogle sange kan kun blive fundet uden (playlist-modify-private playlist-modify-public) som scope
    }

    console.log(access);
    axios.get('https://api.spotify.com/v1/search?'
    // + 'q=remaster%2520track%3APerfect%2520Views%2520artist%3ARouge%2520album%3AEarth-EP'
    + 'q=remaster%2520track%3ALittle%2520Too%2520Close%2520artist%3AWRLD%2CVeronika%2520Redd%2520album%3AChase%2520It'
    // + 'q=remaster%2520track%3ABlueming%2520artist%3AIU%2520album%3ALove%2520poem%2520genre%3AKpop%2520year%3A2019'
    + '&type=track'
    + '&limit=3', options)
    .then(response => console.log(response))
    .catch((error) => {
    if(error.status == 400) {
        console.log("wlp");
    }

    
    if(error.status == 401) {
        console.log("juju");
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
    .then(async (data) => {
        console.log(data);
        ApiSearch(data.access_token)
    })
    }
})

}ApiSearch()
















/**
 * laver et api kald til spotify hvor vi lægger en sang i en playliste
 */
// async function AddSongToPlaylist() {
//     let playlistID = "42xr6CZ4SlVULt5BGaFPrK"

//     let Atoken = await token()
//     .then(response => {return response.data})

//     console.log(Atoken);
//     await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${Atoken.access}`
//         },
//         body: JSON.stringify({
//             "uris": ["spotify:track:7iC9PkiqWeN7E3WWh2dU5P", "spotify:track:6rmXhRIemCTPyMYZRDN7Qg"]
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
    
//     })
    
// }
// AddSongToPlaylist()
>>>>>>> 52521c2c120d8c6e7efb45df2b4d11e1d6276942
