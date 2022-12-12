/**
 * Henter en brugers 50 nyeste playlister ud fra deres bruger id
 */
fetch('https://api.spotify.com/v1/users/1110330469/playlists?limit=50',
{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQDuZhEdyv_xlFYRP0g2QbhR5WRdfXXwpL3ZI7nzOKpJ2ifzdksWBdm9Zsev_dYVx3wLYE3rhNIoRjerVcCbaggeB9z9kK-2tmkDFi8Ro6BU0_MS7-Sc7Qn3TdIk-yJeRzDPXVZdu603dDDda6eGM84y6ytYlUe7L1enjZiyPb5rXwC3f5HYXjPICifvs2Bc2-Q', 
        'Content-Type': 'application/json',
    },
})

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
        console.log(response)
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



