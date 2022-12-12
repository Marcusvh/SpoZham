/**
 * henter en brugers 50 nyeste playlister ud fra deres bruger id
 */
fetch('https://api.spotify.com/v1/users/1110330469/playlists?limit=50',{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQAZgbSUIwlw2k4jSt2AyIu2ZFr7U0DJdNG9EkZxaiRy9fnXZS9kgw4mrknhbiCTbV9H4T1Rmn_tX_yYvktsjgzsq0nM39HoxMYOxb8793RN7UV7rkb82JRERp3VEUuPtEwldTZjtQFsgvTPt2gReKVHdgyFPJxNgX96XocA2eJgtZxHQNz5s7XwrNBb', 
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

