/**
 * henter en brugers 50 nyeste playlister ud fra deres bruger id
 */
fetch('https://api.spotify.com/v1/users/1140904457/playlists?limit=50',{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQAO1Og8ttb14ryjfnPGDjmhlR2R0b7G-hgBfMbp2wRrXs2iG9H-uwVxOEykbrjuyv2wpA0qYF_sOunJVMskMk_P_SPWze6P9h2ARjDXIVyYRoPSssqwTfiNt_gulRKBbQhgS2WUK2AVieB-CVYZfa3W5bpkTDpbSudBYIGb3RqVDA5NZs30Ween2EVYb2sTg56dU8QUEaZpe1knxot0QvyJx6jvO86nhzLRjWeRqLDibTl5bQ', 
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(response => {
        console.log(response)
        const playlists = response.items    
        playlists.forEach(element => { 
            console.log(element)
            makeOption(element.name, 'value', element.id)
            makeP(element.name, '', '')
        });    
})

/**
 * printer en brugers playlister ud under sang informationen
 */
function makeOption(text, attr, attrValue) {
    let parentAppend = document.getElementById('AllPlaylists')

    let pText;
    const p = document.createElement('option')
    if(text != "" && text != null){
        pText = document.createTextNode(text)
        p.append(pText)
    }

    if(attr != "" && attr != null) {
        p.setAttribute(attr, attrValue)
    }

    parentAppend.appendChild(p)
}

function ViewPlaylist(){
    let playlistID = document.getElementById("AllPlaylists").value
    let playlistShow = document.getElementById("ShowPlaylist")
    playlistShow.setAttribute('href', "https://open.spotify.com/playlist/" + playlistID)
   
}
        
    function makeP(text, attr, attrValue) {
       let parentAppend = document.getElementById('ShowPlaylists')

       let pText;
       const p = document.createElement('h4')
       if(text != "" && text != null){
           pText = document.createTextNode(text)
           p.append(pText)
       }

       if(attr != "" && attr != null) {
           p.setAttribute(attr, attrValue)
       }

       parentAppend.appendChild(p)
   }

