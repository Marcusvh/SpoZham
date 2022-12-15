/**
 * Gets the refresh token to get a new access token, based on the user ID
 */
async function RefreshToken() {
    return axios.get(`https://spozham-rest.azurewebsites.net/api/User/Spotify/GetRefreshToken?id=${userId}`)
}

/**
 * uses the refreshToken to get a new access token and post it to the database
 */
async function GetAndPostToken() {
    fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic ZDU3MjdjZDUxZmRkNGY5NWFmMWE3NGI0YzUwODdkOTI6ZDMwMWMxOWMyM2YyNGM0Y2IwZjFjM2YwNjk1NjQ1Mjk="
            },
            body: new URLSearchParams({
                "grant_type": "refresh_token",
                "refresh_token": await RefreshToken().then(response => {return response.data})
            })
        })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        axios.post(`https://spozham-rest.azurewebsites.net/api/User/Spotify/RefreshToken?id=${userId}&access=${data.access_token}`)   
            .then(response => {
                console.log(response);
            })
    })
} GetAndPostToken()


/**
 *  api call to get the access token based on userID 
 * @returns the api call
 */
async function getToken() {
    return fetch(`https://spozham-rest.azurewebsites.net/api/User/Spotify/Token?id=${userId}`)
}


/**
 * Henter en brugers 50 nyeste playlister ud fra deres bruger id
 */
async function getPlaylist() {
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`,
    {
        method : 'GET',
        headers: {
            'Authorization': 'Bearer ' + await getToken().then(response => response.json().then((data) => data.access)), 
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
                makeOption(element.name, 'value', element.id)
                makeP(element.name, 'href', element.external_urls.spotify)
                
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
}
getPlaylist()

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
 * Funktion til visning og linkning af playlister i venstre side og laver en streg under hver playlist navn. 
 * @param {text} text 
 * @param {attribute} attr 
 * @param {attributevalue} attrValue 
 */
function makeP(text, attr, attrValue) {
    let parentAppend = document.getElementById('ShowPlaylists')

    let pText;
    const p = document.createElement('a')
    if(text != "" && text != null){
        pText = document.createTextNode(text)
        p.append(pText)
    }

    if(attr != "" && attr != null) {
        p.setAttribute(attr, attrValue)
    }
    let hr = document.createElement("hr")
    hr.setAttribute("class", "playlistItemsLine")
    parentAppend.appendChild(hr)
    parentAppend.appendChild(p)
}