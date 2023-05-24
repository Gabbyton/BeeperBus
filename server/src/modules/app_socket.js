const userCountIdPrefix = 'userRS'

let userCountForEachRouteAndStop = new Map() // key created by concatenating route and stop

function leaveOtherRooms(socket) { // only when already subscribed, e.g. switching rooms
    var leftRooms = [];
    for (const previousRoom of socket.rooms.values()) {
        if (previousRoom !== socket.id) {
            console.log(`user left room: ${previousRoom}`)
            leftRooms.push(previousRoom)
            socket.leave(previousRoom)
        }
    }
    return leftRooms
}

function changeUserCount(userCountKey, change) {
    if (userCountForEachRouteAndStop[userCountKey] == null || userCountForEachRouteAndStop[userCountKey] == undefined) {
        console.log(`triggered entry initialize...`)
        if (change >= 0) {
            console.log(`change: ${change}`)
            userCountForEachRouteAndStop[userCountKey] = change
        }
    } else {
        console.log(`increment triggered instead...`)
        userCountForEachRouteAndStop[userCountKey] += change
        console.log(`new value: ${userCountForEachRouteAndStop[userCountKey]}`);
    }
}

function didSubscribe(socket) {
    return socket.rooms != null && socket.rooms.size > 1;
}

function displayJoinedRooms(socket) {
    for (const room of socket.rooms.values()) {
        console.log(`user joined room: ${room}`)
    }
}

function getRoomArray(socket) {
    let roomArray = []
    for (const room of socket.rooms.values()) {
        roomArray.push(room)
    }
    return roomArray
}

function unsubscribe(socket, io) {
    if (didSubscribe(socket)) {
        displayJoinedRooms(socket)
        const rooms = getRoomArray(socket)
        const routeId = rooms[1] // room is equal to routeId
        const userCountKey = rooms[2] // room is guaranteed to have concatenated route and stop id at this index
        const stopId = userCountKey.split('-')[2]
        console.log(`routeId: ${routeId}, userCountKey: ${userCountKey}, stopId: ${stopId}, userCount: ${userCountForEachRouteAndStop[userCountKey]}`);
        for (const previousRoom of rooms) {
            if (previousRoom.includes(userCountIdPrefix)) {
                changeUserCount(previousRoom, -1) // decrease user count when leaving the room
            }
        }
        io.to(routeId).emit('user-exited', {
            action: 'exited',
            userId: socket.id,
            routeId: routeId,
            stopId: stopId,
            count: userCountForEachRouteAndStop[userCountKey]
        })
        leaveOtherRooms(socket)
    }
}

// TODO: create data model for user data
/*

userData : {
    routeId: number,
    stopId: number
}

returnData: {
    userId: number,
    routeId: number,
    stopId: number,
    countAtStop: number,
}

 */

function initSocketIO(http) {
    const io = require('socket.io')(http, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('msg', _ => {
            console.log('hello from us!!');
        });

        socket.on('subscribe', userData => {
            console.log(userData);
            leaveOtherRooms(socket)
            const routeId = `${userData.routeId}`; // room for socket is still route Id to notify respective drivers
            const userCountKey = `${userCountIdPrefix}-${userData.routeId}-${userData.stopId}` // used only for user count map
            socket.join(routeId) // route room
            socket.join(userCountKey) // route and stop room
            changeUserCount(userCountKey, 1) // add 1 once room is joined
            displayJoinedRooms(socket)
            io.to(routeId).emit('user-joined', {
                action: 'joined',
                userId: socket.id,
                routeId: routeId,
                stopId: userData.stopId,
                count: userCountForEachRouteAndStop[userCountKey]
            })
        })

        socket.on('unsubscribe', () => {
            unsubscribe(socket, io)
        })
        // NOTE: room is not the same as user count key
        socket.on('disconnecting', () => {
            if (didSubscribe(socket)) {
                unsubscribe(socket, io)
            }
        })
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    });
}

module.exports = initSocketIO;