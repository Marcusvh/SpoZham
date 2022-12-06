// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '0f6eff705dmshf162a9814c66ba5p13b8c4jsnef8afa48c048',
//         'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//     }
// };

// var trackId

// fetch("http://localhost:5204/api/")



// fetch('https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=491697169', options)
//     .then(response => response.json())
//     .then(response => {
//         console.log(response)
//         document.getElementById('song').innerHTML = response.title
//         document.getElementById('artist').innerHTML = response.subtitle
//         document.getElementById('release').innerHTML = response.releasedate
//     })
//     .catch(err => console.error(err));

 
    
fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3ABad%2520Guy%2520artitst%3ASet%2520It%2520Off%2520Duality%25202014&type=track&include_external=audio',{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQCq8a1y1DXSkxwc9qxPJTwLi_l8DOzrR9e_xCFm0mPi6aAczR60gQ91v_kKj9jCZA972pzVhoeF-uKzM16Tw0ZiPFz365CSQveug1pdJBn4hJtaCFnYkhuS4wNK4hOvNI5xNcJSmIbvHl0y4l84V6eehfo9nAQMfpe1si4hMZ-sF0Qc8Pyu', 
        'Content-Type': 'application/json',
    },  
})
.then(response => response.json())
.then(response => {
        console.log(response.tracks)
        document.getElementById('song').innerHTML = response.tracks.items[0].name
        document.getElementById('artist').innerHTML = response.tracks.items[0].artists[0].name
        document.getElementById('release').innerHTML = response.tracks.items[0].album.release_date
})
