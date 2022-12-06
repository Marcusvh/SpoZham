const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('code');
let refreshToken = "";

console.log(myParam);

async function reqToken() {
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
    .then((data) => {
        console.log(data)
        refreshToken = data.refresh_token
    })
}reqToken()


async function RefreshToken() {
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
    .then((data) => console.log(data))
}