document.addEventListener('DOMContentLoaded', () => {
    const socket = io('/')
    socket.emit('register-tracker')

    socket.emit('_ping')
    socket.on('_pong', () => {
        console.log('got pong')
    })

    const options = {
        enableHighAccuracy: true,
        maximumAge: 0
    };

    // navigator.geolocation.getCurrentPosition(result, error, [options])
    setInterval(() => {
        console.log('tick')
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude: lat, longitude: lng } = pos.coords
            socket.emit('update-location', { lat, lng })
            console.log(pos.coords)
        }, err => {
            console.log(err)
        }, options)
    }, 5000)


})
