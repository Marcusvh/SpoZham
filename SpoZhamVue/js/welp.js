axios.post('https://api.spotify.com/v1/playlists/42xr6CZ4SlVULt5BGaFPrK/tracks', {uris: 'spotify:track:3dEO0wAx9fVXQe06v0LDy1'}, {
    headers: {
        "Authorization": "Bearer BQAg_3DHGxeNOa50HGRQdr55fIt9t4DQ7Q1zpUhMOEuCrFHuwQw5VdQ4Zc-XWPCFH-t_odViIbd5sKEbytuOKNXJw96o8JHn-OL2uAHJgusJdQcjRM3Z-jqjUBCsY7jtsKzPCjiktlN1UJLIIPGHALxGQDf-nDhbKg-baQ5VfR2kF92f9mh4rhv3e7XXbkcSKdsXdwW4oGJXcwylRjkn", 
        "content-Type": 'application/json',
    }, 
    // body: JSON.stringify({
    //     uris: 'spotify:track:3dEO0wAx9fVXQe06v0LDy1'
    // }),
    // json: true
})
.then(response => response.json())
.then(data => {
    console.log(data)

})
