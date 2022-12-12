/**
 * Finder information om en sang og printer den ud
 * input: får sanginformation fra spotify
 * output: printer sangtitel, kunstner samt releasedato ud på den fundne sang
 */
function ShowSongInfo(){
    fetch("https://api.spotify.com/v1/search?q=remaster%2520track%3ABad%2520Guy%2520artist%3ASet%2520It%2520Off%2520album%3ADuality%25year%3A202014&type=track&include_external=audio",{
            method : 'GET',
            headers: {
                'Authorization': 'Bearer BQBPYtMkdIqZ9c0vrRC_i8yk9jk6EehQyf2Q8gEOpZdcFPGHV0XZyU-fOeUjpq29DioWEJCueqoZ3VWyO17ukFAUlaYpLEJYs9PrxSNlZ39WP8rTc6KP-AMTfdVCbFP8NoeJY-pN20rYspo2hc_dc_UvDcSC4o5OpOL7Cs-snB_RtLrSLzvI', 
                'Content-Type': 'application/json',
            },  
        })
        .then(response => response.json())
        .then(response => {
    
                console.log(response.tracks)
                document.getElementById('song').innerHTML = response.tracks.items[0].name
                document.getElementById('artist').innerHTML = response.tracks.items[0].artists[0].name
                document.getElementById('release').innerHTML = response.tracks.items[0].album.release_date
           
        })
        
    }

/**
 * Finder information om en sang kalder AddSongToPlaylist() funktionen
 * input: får sanginformation fra spotify
 * output: ved sucess får den lagt en sang ind på den valgte playliste
 */
function FindSongInfo(){
fetch("https://api.spotify.com/v1/search?q=remaster%2520track%3ABad%2520Guy%2520artist%3ASet%2520It%2520Off%2520album%3ADuality%25year%3A202014&type=track&include_external=audio",{
        method : 'GET',
        headers: {
            'Authorization': 'Bearer BQBPYtMkdIqZ9c0vrRC_i8yk9jk6EehQyf2Q8gEOpZdcFPGHV0XZyU-fOeUjpq29DioWEJCueqoZ3VWyO17ukFAUlaYpLEJYs9PrxSNlZ39WP8rTc6KP-AMTfdVCbFP8NoeJY-pN20rYspo2hc_dc_UvDcSC4o5OpOL7Cs-snB_RtLrSLzvI', 
            'Content-Type': 'application/json',
        },  
    })
    .then(response => response.json())
    .then(response => {
            AddSongToPlaylist(response.tracks.items[0].id)
    })
    
}

/**
 * laver et api kald til spotify hvor vi lægger en sang i en playliste
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
                "Authorization": "Bearer BQBJhUJ8R5VXC1_E3YoXr7nkpEWYmL461EQNTeC_9lQ-6c6Ish2lKpCZLfuOiVu-UBt0iqCKIeYkIDVsnB97_uX06SpYu74EufjCaR6J-Ty06JTjju1_4fvu1gHbCdHvg2Qw0oVuVi8DpBcYgLNe2wISQL1uTHSrggUXVzqGZ5YV1NQpc_EGQMTrDMnuuoCpxcCHNMqM2kNGY8k"
            },
            body: JSON.stringify({
                "uris": [`spotify:track:${track_id}`]
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.error.status)
            if(data.error.status == '400'){
            document.getElementById('error2').removeAttribute("hidden")
            document.getElementById('error1').innerHTML = 'Der er sket en fejl. Sangen blev ikke tilføjet :('

            }
           
                

            
        })
        
  

    }



ShowSongInfo()   

