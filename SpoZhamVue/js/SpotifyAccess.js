/**
 * Finder information om en sang og printer den ud, giver også AddSongToPlaylist et track id
 */
function FindSongInfo(){
fetch("https://api.spotify.com/v1/search?q=remaster%2520track%3ADo+It+Now+Remember+It+Later%2520artist%3ASleeping+With+Sirens%2520year%3A2011%25album%3A20Let's+Cheers+To+This&type=track&include_external=audio",{
        method : 'GET',
        headers: {
            'Authorization': 'Bearer BQB9G2jiprI34aeDsmGg-Ov60S73H-Vq8il4msGdwUreWCqyMQZh_aQcl-YdmJsRRtNCkl0hjdkFOEqUOB0LqUYOKc6OENzgkzZ3uieUIK_8YhUjj19LgIRuciY2E9916PfIhD692it0bXl_pi7JdEJNd0dERAyoBg3vGuLkVu5M8owfC6GvfCs', 
            'Content-Type': 'application/json',
        },  
    })
    .then(response => response.json())
    .then(response => {
            console.log(response.tracks)
            document.getElementById('song').innerHTML = response.tracks.items[0].name
            document.getElementById('artist').innerHTML = response.tracks.items[0].artists[0].name
            document.getElementById('release').innerHTML = response.tracks.items[0].album.release_date
            // AddSongToPlaylist(response.tracks.items[0].id)
    })
    
}

/**
 * laver et api kald til spotify hvor vi lægger en sang i en playliste
 */
 async function AddSongToPlaylist() {
    let playlistID = document.getElementById("AllPlaylists").value
    console.log(playlistID);

    await fetch(`https:api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer BQAO1Og8ttb14ryjfnPGDjmhlR2R0b7G-hgBfMbp2wRrXs2iG9H-uwVxOEykbrjuyv2wpA0qYF_sOunJVMskMk_P_SPWze6P9h2ARjDXIVyYRoPSssqwTfiNt_gulRKBbQhgS2WUK2AVieB-CVYZfa3W5bpkTDpbSudBYIGb3RqVDA5NZs30Ween2EVYb2sTg56dU8QUEaZpe1knxot0QvyJx6jvO86nhzLRjWeRqLDibTl5bQ"
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
