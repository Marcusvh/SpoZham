const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('code');
let refreshToken = "";

// User Id
const testId = 14


console.log(myParam);

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
        console.log(data)

        /**
         * Gets the id of the logged in user from spotify api call 
         * */ 
        let userId = await getUserId(data.access_token)
                    .then(response => {return response.data.id})
        console.log("reqTOKEN USER");
        console.log(userId);

        /**
         * make a post call to REST api to store the user ID, access token and refresh token
         */
        // await axios.post(`http://localhost:5204/api/User/Spotify/AddToken?id=${testId}&access=${myParam}&refresh=${refreshToken}`)   
        // .then(response => {
        //     console.log(response);
        // })
    })
}
reqToken()

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
        
        /**
         * adds the new access token to REST api, where it will be put into the database
         */
        await axios.post(`http://localhost:5204/api/User/Spotify/RefreshToken?id=${testId}&access=${data.access_token}`)   
        .then(response => {
            console.log(response);
        })
    })
}