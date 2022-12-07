 let testId = 1140904457

async function token() {
    return axios.get(`http://localhost:5204/api/User/Spotify/Token?id=${testId}`)
}

/**
 * laver et api kald til spotify hvor vi lægger en sang i en playliste
 */
async function AddSongToPlaylist() {
    let playlistID = "42xr6CZ4SlVULt5BGaFPrK"

    let Atoken = await token()
    .then(response => {return response.data})

    console.log(Atoken);
    await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Atoken.access}`
        },
        body: JSON.stringify({
            "uris": ["spotify:track:7iC9PkiqWeN7E3WWh2dU5P", "spotify:track:6rmXhRIemCTPyMYZRDN7Qg"]
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    
    })
    
}
// AddSongToPlaylist()