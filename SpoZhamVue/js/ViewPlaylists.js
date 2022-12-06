fetch('https://api.spotify.com/v1/users/1110330469/playlists?limit=50',{
    method : 'GET',
    headers: {
        'Authorization': 'Bearer BQBlZiLPn5QODSjJ9wfbz0eGRAa_5fcfnvDqJEPMac4_Tg2bzz7_kfG-s_L5mSh-t-yZJMkWH4eRnw3kBQ2nMsRo_5K8KlRkjumU2FVQIc_nRrIVOGeSaf88UVtLaQlYAE2yM9g5rzh-DjeNIfA6FEHfL77G38hfdrOlXgqupbv2EUO91IttzrdHHxVz', 
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

function makeP(text, attr, attrValue) {
    let parentAppend = document.getElementById('AllPlaylists')

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
