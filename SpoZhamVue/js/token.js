const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('code');
let refreshToken = "";
const errorHandingTag = document.getElementById("errorHandling")
// User Id
const testId = 1140904457

/**
 * spotify api call to get the logged in user ID
 * @param {string} token - access token
 * @returns HTTP GET call to find user id
 */
async function getUserId(token) {
    let options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    return axios.get('https://api.spotify.com/v1/me', options)    
}

/**
 * make a call to spotify api to get a authorized access token(token with rights) and store it together with logged in user ID and token to refresh access token.
 */
async function reqToken() {
    /**
     * make a call to spotify api to get a access token and refresh token
     */
    await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic ZDU3MjdjZDUxZmRkNGY5NWFmMWE3NGI0YzUwODdkOTI6ZDMwMWMxOWMyM2YyNGM0Y2IwZjFjM2YwNjk1NjQ1Mjk="
        },
        body: new URLSearchParams({
            "grant_type": "authorization_code",
            "code": myParam,
            "redirect_uri": "http://127.0.0.1:5500/AccessToken.html"
        })
    })
    .then((response) => response.json())
    .then(async (data) => {
        console.log(data);
        /**
         * Gets the id of the logged in user from spotify api call 
         * */ 
        let userId = await getUserId(data.access_token)
                    .then(response => {return response.data.id})
        console.log(userId);
        /**
         * make a post call to REST api to store the user ID, access token and refresh token
         */
        // await axios.post(`http://localhost:5204/api/User/Spotify/AddToken?id=${userId}&access=${myParam}&refresh=${data.refresh_token}`)   // uncomment this and set ${testId} to ${userId} for getting token into database
        // .then(response => {
        //     console.log(response);
        // })
    })
    .catch((error) => {
        if(error.response.status == 401) {
            errorHandingTag.innerHTML = "Kunne ikke få adgang til spotify. genindlæs siden og prøv igen. " + error.code + " " + error.response.status
        }
    })
}
reqToken()


/**
 * checks if there has passed 1 hour from token creating. it will run RefreshToken function if it has.
 */
axios.get(`http://localhost:5204/api/User/Spotify/Token?id=${testId}`)
.then(response => {
    console.log(response);
    let time = response.data.timeStamp

    tokenTime = Date.parse(time)
    newDateTime = new Date()
    newTime = newDateTime.getHours() + 1;
    newDateTime.setHours(newTime)
    
    DateTimeMs = Date.parse(newDateTime)

    console.log((DateTimeMs - tokenTime) > 3600000);
    

    if ((DateTimeMs - tokenTime) > 3600000) {
        RefreshToken()
    }
})




/**
 * based on the user ID a new access token will be made and updated in the database
 */
async function RefreshToken() {
    refreshToken = "";

    /**
     * Gets the refresh token to get a new access token, based on the user ID
     */
    await axios.get(`http://localhost:5204/api/User/Spotify/GetRefreshToken?id=${testId}`)
    .then(response => {
        refreshToken = response.data
        if(refreshToken == "") {
            errorHandingTag.innerHTML = "Kunne ikke få fat i en ny adgang til spotify. "
        }
    })
        

    /**
     * gets the new access token, based on the refresh token from above api call
     */
    await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic ZDU3MjdjZDUxZmRkNGY5NWFmMWE3NGI0YzUwODdkOTI6ZDMwMWMxOWMyM2YyNGM0Y2IwZjFjM2YwNjk1NjQ1Mjk="
        },
        body: new URLSearchParams({
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        })
    })
    .then((response) => response.json())
    .then(async (data) => {
        console.log(data);
        if(data.access_token == "" || data.access_token === undefined) {
            errorHandingTag.innerHTML = "kunne ikke få en ny adgang. prøv at logge ind igen"
        }
        
        /**
         * adds the new access token to REST api, where it will be put into the database
         */
        await axios.post(`http://localhost:5204/api/User/Spotify/RefreshToken?id=${testId}&access=${data.access_token}`)   
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            errorHandingTag.innerHTML = "kunne ikke gemme den nye adgangs tilladlse. "
        }) 
        
    })
}