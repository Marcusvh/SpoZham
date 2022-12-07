async function AddSongToPlaylist() {
    await fetch('https://api.spotify.com/v1/playlists/42xr6CZ4SlVULt5BGaFPrK/tracks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer BQBT6OK4Mz8EUygTGp0bBtWmJdqAbrh3j-wuC3DtUGE4jQ5GSHFIn_L1i94Er2_7Z8VD3vGG_Kj7C8rs8bhcWQB4W2X6eseBHBGzsrQ0M15GsC4ChugPSt1yHtxZOKc0Ycy3PQ27XLse3BvG5Q0NH0uk1e2jM-yWQQoEOshurYrjRTNWhzpaOzylm2adIKyo6xp_9F5veJVlNaLOdAus"
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