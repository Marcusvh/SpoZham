/**
 * spotify user id
 */
// const userId = "1140904457"


// /**
//  * Gets the refresh token to get a new access token, based on the user ID
//  */
// async function RefreshToken() {
//     return axios.get(`http://localhost:5204/api/User/Spotify/GetRefreshToken?id=${userId}`)
// }

// /**
//  * uses the refreshToken to get a new access token and post it to the database
//  */
// async function GetAndPostToken() {
//     fetch('https://accounts.spotify.com/api/token', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Authorization": "Basic ZDU3MjdjZDUxZmRkNGY5NWFmMWE3NGI0YzUwODdkOTI6ZDMwMWMxOWMyM2YyNGM0Y2IwZjFjM2YwNjk1NjQ1Mjk="
//             },
//             body: new URLSearchParams({
//                 "grant_type": "refresh_token",
//                 "refresh_token": await RefreshToken().then(response => {return response.data})
//             })
//         })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         axios.post(`http://localhost:5204/api/User/Spotify/RefreshToken?id=${userId}&access=${data.access_token}`)   
//             .then(response => {
//                 console.log(response);
//             })
//     })
// } GetAndPostToken()



// /**
//  *  api call to get the access token based on userID 
//  * @returns the api call
//  */
// async function getToken() {
//     return fetch(`http://localhost:5204/api/User/Spotify/Token?id=${userId}`)
// }

// /**
//  * Finder information om en sang kalder AddSongToPlaylist() funktionen
//  * input: får sanginformation fra spotify
//  * output: ved sucess får den lagt en sang ind på den valgte playliste
//  */
// async function FindSongInfo(){
// fetch("https://api.spotify.com/v1/search?q=remaster%2520track%3ADo+It+Now+Remember+It+Later%2520artist%3ASleeping+With+Sirens%2520year%3A2011%25album%3A20Let's+Cheers+To+This&type=track&include_external=audio",{
//         method : 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + await getToken().then(response => response.json().then((data) => data.access)), 
//             'Content-Type': 'application/json',
//         },  
//     })
//     .then(response => response.json())
//     .then(response => {
//             AddSongToPlaylist(response.tracks.items[0].id)
//     })
    
// }