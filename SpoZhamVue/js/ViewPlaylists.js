/**
 * Henter en brugers 50 nyeste playlister ud fra deres bruger id
 */
fetch('https://api.spotify.com/v1/users/1110330469/playlists?limit=50',
{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQDnpWXjUYKSWuC74HjKPdaplsAu-W8F6Nz3pmEij5bKIUziR10cqqeus7VwUFZkaGPPU0i_xbdhf0FaSlm1xyRzjeOm3Q4QRE5hBCHt6Jda0PIGAvL4RFzVOevTIUJq3c4O4lssqm3yWAkpni2AmxCg72vhxcFW4i2xbeKnO2J1FYuheDL3jbMEYwI7', 
        'Content-Type': 'application/json',
    },
})

/**
 * Printer responset ud som en Json.
 */
.then(response => response.json()) 

/**
 * Printer responset ud som en Json.
 */
.then(response => response.json()) 
.then(response => {
    try 
    {
    /**
     * Printer responset ud i consolen.
     */
    try 
    {
    /**
     * Printer responset ud i consolen.
     */
        console.log(response)
        const playlists = response.items

        /**
         * Går igennem listen af playlister, printer dem ud i consolen og laver options i drop-down menuen.  
         */   
        const playlists = response.items

        /**
         * Går igennem listen af playlister, printer dem ud i consolen og laver options i drop-down menuen.  
         */   
        playlists.forEach(element => { 
            console.log(element)
            makeOption(element.name, 'value', element.id)
            makeP(element.name, '', '')
        })
    }
    /**
     * Hvis playlisterne ikke kommer frem eller findes kastes dette.
     */
    catch(error)
    {
        document.getElementById("error").innerHTML = 'Noget gik galt, bruger har ingen playlister eller forkert bruger'
        document.getElementById("error").removeAttribute("hidden")
    }    
})

/**
 * Funktion til at printe en brugers playlister ud under sang informationen (drop down)
 */
function makeOption(text, attr, attrValue) 
{
    /**
     * Henter ID fra AllPlaylists.
     */
        let parentAppend = document.getElementById('AllPlaylists')

    /**
     * Laver Drop down options.
     */
        let pText;
        const p = document.createElement('option')

    /**
     * Tjekker om teksten ikke er tom eller null, før vi begynder og lave en ny.
     */
        if(text != "" && text != null)
        {
            pText = document.createTextNode(text)
            p.append(pText)
        }

    /**
     * Tjekker om attributen ikke er tom eller null ellers sætter den attributen.
     */
        if(attr != "" && attr != null) 
        {
            p.setAttribute(attr, attrValue)
        }

    /**
     * Tilføjer attributen p til Alle playlister (Parent).
     */
        parentAppend.appendChild(p)
    
    
}

/**
 * Funktion til visning af playlister i venstre side.
 * @param {text} text 
 * @param {attribute} attr 
 * @param {attributevalue} attrValue 
 */
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

