//const { store } = require("./SessionController");

const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();
        
        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    },

    async show(req, res){
        const { user_id } = req.headers;
        const { type } = req.query;
        let bookings;

        if(type === 'book'){
            bookings = await Booking.find().populate({path:'user',match:{_id:user_id}}).populate('spot').exec();
        } else if(type === 'spot') {
            bookings = await Booking.find().populate({path:'spot',match:{user:user_id}}).populate('user').exec();
        }

        return res.json(bookings);
    },

};