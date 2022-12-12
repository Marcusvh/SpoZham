/**
 * Henter en brugers 50 nyeste playlister ud fra deres bruger id
 */
fetch('https://api.spotify.com/v1/users/1110330469/playlists?limit=50',
{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQAZgbSUIwlw2k4jSt2AyIu2ZFr7U0DJdNG9EkZxaiRy9fnXZS9kgw4mrknhbiCTbV9H4T1Rmn_tX_yYvktsjgzsq0nM39HoxMYOxb8793RN7UV7rkb82JRERp3VEUuPtEwldTZjtQFsgvTPt2gReKVHdgyFPJxNgX96XocA2eJgtZxHQNz5s7XwrNBb', 
        'Content-Type': 'application/json',
    },
})

/**
 * Printer responset ud som en Json.
 */
.then(response => response.json())

/**
 * Får vist playlisterne som en liste (Vises i venstre side)
 */
.then(response => {

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
        });    
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



