
function FindSongInfo(){
    console.log("wel");
    fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3ABad%2520Guy%2520artist%3ASet%2520It%2520Off%2520album%3ADuality%2520year%3A2014&type=track&include_external=audio',{
        method : 'GET',
        headers: {
            'Authorization': 'Bearer BQCk8xHd30CfpjtLXBHA105UcIQNr7svXilkA8NiZbjPU5yGA9iwiTavFE3Q4WFTLR5_UNX9ae9v0go3NOlyGHPF_4DneYr6e602MTD9BIE-IqvNc2TIEowsg7gdg_ygnGNQxu7LKpu0NWwqt3S176d7bxh6P4fOpU_K54rykgujgNhrgwmx', 
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
    let playlistID = '00dPpPbcHtrqfhlmZhaMXu'

    await fetch(`https:api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer BQC1t8GHQGGu0b8yVm9skOsdv7Ex0ZKax8Kl6D-nv4ewvWEXicqGvjMu3UPNAIbVPPzY2x0yENXBqMiNhoG_xPOyQYWIeuBCaSAQFV_BUnMU46DJCmajKnEtQ4nS1PcVjpCWFpNxslgmzucHodUtrEuadvpUKwFXd6_bUnooLBBJ65B4jYkIRr1PcoA4kagFld7oOpqy5tvc_Ss"
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

//document.getElementById('AddButton').setAttribute("onclick", "FindSongInfo()")

// document.getElementById('AddButton').onclick = FindSongInfo();
//FindSongInfo()
// AddSongToPlaylist()
