
let map;
let markers = new Map()
document.addEventListener('DOMContentLoaded', () => {
    const socket = io('/')
    socket.on('location-update', locations => {
        markers.forEach((marker, id) => {
            marker.setMap(null)
            markers.delete(id)
        })
        console.log(locations)
        locations.forEach(([id, position]) => {
            const marker = new google.maps.Marker({
                position,
                map,
                // title: id
            })
            // if (markers.has(id)) {
            //     const oldMarker = markers.get(id)
            //     oldMarker.setMap(null)
            //     markers.delete(id)
            // }
            markers.set(id, marker)
        });
    })
    setInterval(() => {
        socket.emit('request-location')
    }, 2000)
})

function initMap() {
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat, lng },
            zoom: 8
        })
        var markter;
    }, err => { console.log(err) })

}