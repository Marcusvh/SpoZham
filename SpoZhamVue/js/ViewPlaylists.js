/**
 * henter en brugers 50 nyeste playlister ud fra deres bruger id
 */
fetch('https://api.spotify.com/v1/users/1110330469/playlists?limit=50',{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQDnpWXjUYKSWuC74HjKPdaplsAu-W8F6Nz3pmEij5bKIUziR10cqqeus7VwUFZkaGPPU0i_xbdhf0FaSlm1xyRzjeOm3Q4QRE5hBCHt6Jda0PIGAvL4RFzVOevTIUJq3c4O4lssqm3yWAkpni2AmxCg72vhxcFW4i2xbeKnO2J1FYuheDL3jbMEYwI7', 
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

   function ViewPlaylist(){
    let playlistID = document.getElementById("AllPlaylists").value
    let playlistShow = document.getElementById("ShowPlaylist")
    playlistShow.setAttribute('href', "https://open.spotify.com/playlist/" + playlistID)
   
}


