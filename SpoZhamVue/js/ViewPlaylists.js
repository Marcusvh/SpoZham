/**
 * spotify user id
 */
// const userId = "1140904457"


/**
 * Gets the refresh token to get a new access token, based on the user ID
 */
async function RefreshToken() {
    return axios.get(`http://localhost:5204/api/User/Spotify/GetRefreshToken?id=${userId}`)
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
        // TODO exception
        axios.post(`http://localhost:5204/api/User/Spotify/RefreshToken?id=${userId}&access=${data.access_token}`)   
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
    return fetch(`http://localhost:5204/api/User/Spotify/Token?id=${userId}`)
}




/**
 * henter en brugers 50 nyeste playlister ud fra deres bruger id
 */
async function getPlaylist() {
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`,{
        method : 'GET',
        headers: {
            'Authorization': 'Bearer ' + await getToken().then(response => response.json().then((data) => data.access)), 
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
}
getPlaylist()

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

