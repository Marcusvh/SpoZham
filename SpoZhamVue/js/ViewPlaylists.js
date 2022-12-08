fetch('https://api.spotify.com/v1/users/1110330469/playlists?limit=50',{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQARobTfyu5gyW-MbT42UM1gJGuW4Ly9IYau3-xOynX0FPGp6PNGNUBcME2U1PfNTfzHo8kFpPCpTC_R0SirmYAKrqQwdn5KMqKIL59gZCxd4al1kwnuuDrUnL1ZaSRlS1QpE9Dse88XPStQ_4C1TSEw7HIYl2xv-k_e5llgrmxdvCkfYHlYaNgU7Hup', 
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(response => {
        console.log(response)
        const playlists = response.items    
        playlists.forEach(element => { 
            console.log(element)
            //makeP(element.name, '', '')
            makeOption(element.name, '', '')
        });    
})


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

// function makeP(text, attr, attrValue) {
//     let parentAppend = document.getElementById('AllPlaylists')

//     let pText;
//     const p = document.createElement('h4')
//     if(text != "" && text != null){
//         pText = document.createTextNode(text)
//         p.append(pText)
//     }

//     if(attr != "" && attr != null) {
//         p.setAttribute(attr, attrValue)
//     }

//     parentAppend.appendChild(p)
// }

