module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('courier-location', (data) => {
            io.emit('courier-location-update', data);
        });

        socket.on('delivery-status', (data) => {
            io.emit('delivery-status-update', data);
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};
