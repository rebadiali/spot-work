const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        if (booking.approved == null){
            booking.approved = false;
        }
        else if (booking.approved == true){
            console.log('Reserva já aprovada');
        }
        else{
            console.log('Já tinha sido rejeitado, more');
        }

        await booking.save();
        
        const bookingUserSocket = req.connectedUsers[booking.user];

        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
};