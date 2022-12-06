// async function RefreshToken(){
//     await fetch(' https://accounts.spotify.com/v1/playlists/00dPpPbcHtrqfhlmZhaMXu/tracks', {
//         method: "POST",
//         hearders: {
//             "Content.Type": "application/json",
//             "Authorization": "Basic BQBkzbEkdpb_gzFIgB7OpUs4Vrr_HXvezl5dvwcHqimntpW1baMUUME-HEyCj6cXKH-fZmU0l1q16c6UuRhw5oT2kkvmMsq6EifZmoFjhRSUIh4YzUupDg9CZPf9EfOF1JKVjAz42V_xGfVweiRiqBjMeqKgfxikMg_8QLMnTOtmf67ggiDzkprYqYuhy2XKVce23anCL0pGMeKBeQTj"
//         },
//         body: new URLSearchParams({
//             uris: 'spotify:track:7uxlFQbjGOMwVmjqMf1EIY' 
//         })
//     })
//     .then((response) => response.json())
//     .then(async (data) => console.log(data))
// }


async function welp() {
    var options = new URLSearchParams({
        
        headers: {
            'Authorization': 'Bearer BQB3nymbtkq1L6EB62xhSqzhF-707qAEEMeID601WgR0FoulVOF90eTZoHacIgYn7t5yXqJIYQlxyb2zFxlsecQUk-iCfA7G2RnYcLQtCDNexjzA8PMOYwJPQ2r0tECWO_U35ZIQEWNJonjF6CEPdIjKYsho1rwfEE-bhsI65KmQJRsWG3dJuMS_Ynan29-mW_lAfjUj9luQ6q_Fop-bAN6Iwg', 
            'Content-Type': 'application/json',
        }, 
        data: {
            uris: 'spotify:track:7uxlFQbjGOMwVmjqMf1EIY'
        }
    })
    
    await axios.post('https://api.spotify.com/v1/playlists/00dPpPbcHtrqfhlmZhaMXu/tracks', options)
    //  {
    //       method: 'POST',
    //     //  headers: {
    //     //      "Authorization": "Bearer BQA799BqN3rZLfzgjFBfOj15yl0D-Vq9SlCfKkM-VdAbPFC2ZMqKEyQQLo05LyLkEKwZFRXDP3GofM3JCSngfCHmChiTrRXNb2bnbEAlPtt-Ffq6tbA20aDUmOZSnu2WGFNt-cbVS5zhhqkwJJYJzzgFo_KALL5-3I6iiKeXOUqJ2QQ_BiGG-4BWYy3Na4sORYtnWxGRfYxxmorxWqgN", 
    //     //      "Content-Type": "application/json",
    //     //  }, 
    //     //  data: JSON.stringify({
    //      uris: 'spotify:track:7uxlFQbjGOMwVmjqMf1EIY'
    // })
    //  })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    
}

 welp()
// RefreshToken()
