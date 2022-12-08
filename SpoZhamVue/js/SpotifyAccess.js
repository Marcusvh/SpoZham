/**
 * Finder information om en sang og printer den ud, giver også AddSongToPlaylist et track id
 */
function FindSongInfo(){
fetch("https://api.spotify.com/v1/search?q=remaster%2520track%3ADo+It+Now+Remember+It+Later%2520artist%3ASleeping+With+Sirens%2520year%3A2011%25album%3A20Let's+Cheers+To+This&type=track&include_external=audio",{
        method : 'GET',
        headers: {
            'Authorization': 'Bearer BQA-A3rhb8EVRlN0mBV7on2Kg9UKGNBnoMF_4yZDlrGrZ7-0-Jdy6ZMJl4gP7BIATJuoytlDxFOZ7a9XZrOTpZaim_2rL14BzC8dmJSnc9e5wua9FXXGjjIYsVnD0z16c19sZsX4W4mX4VURXzzXTv_bWtJ25_J-guJY8JxC8DRYrGhGlW0V', 
            'Content-Type': 'application/json',
        },  
    })
    .then(response => response.json())
    .then(response => {
            console.log(response.tracks)
            document.getElementById('song').innerHTML = response.tracks.items[0].name
            document.getElementById('artist').innerHTML = response.tracks.items[0].artists[0].name
            document.getElementById('release').innerHTML = response.tracks.items[0].album.release_date
            AddSongToPlaylist(response.tracks.items[0].id)
    })
    
}

/**
 * laver et api kald til spotify hvor vi lægger en sang i en playliste
 */
 async function AddSongToPlaylist(track_id) {
    let playlistID = document.getElementById("AllPlaylists").value
    console.log(playlistID);

    await fetch(`https:api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer BQD6wW2T5PH39N9B0Fa95yUeodEYG20YGUNEAgrLN56IqzTZNRxxHjhi8gJ-iuD_0dZnAsgwmvA2QJrwBMFr_SFjwStNXJIQTDYF45aAj6Z8TOVAJWOvh1rbWM-9YLRHnouZu9LCjbrJ4-SNpG4J5ZaD7Galse8wON7z2jyOC_Tf5MkO6CmOvk208YJua9qMCwoQOaTqwKsRKk8"
        },
        body: JSON.stringify({
            "uris": [`spotify:track:${track_id}`]
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('AllPlaylists').innerHTML
    })
}


// document.getElementById('AddButton').setAttribute("onclick", "FindSongInfo()")

// document.getElementById('AddButton').onclick = FindSongInfo();
//FindSongInfo()
// AddSongToPlaylist()
