const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async getId(req, res) {
        const { spot_id } = req.params;

        const spots = await Spot.findById(spot_id);

        return res.json(spots);
    },

    async store(req, res) {
        const { filename } = req.file;
        const { company, address, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does not exists' });
        }

        const spot = await Spot.create({
            user: user_id,
            address,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot)
    },

    async delete(req, res) {
        const { spot_id } = req.params;
        try {
            await Spot.findByIdAndDelete(spot_id);

            return res.send({message: 'Spot ' + spot_id + ' deletado com sucesso'}); 
        } catch (error) {
            return res.status(400).send({error: 'Erro ao deletar'});
        } 
    },

    async patch(req, res) {
        const { spotid, company, address, techs, price } = req.body;

        await Spot.findByIdAndUpdate(spotid, { 
            $set: {
            address: address,
            company: company,
            techs: techs.split(',').map(tech => tech.trim()),
            price: price,
            }
        }, function(error, result) {
            if(error){
                console.log(error);
            }
            console.log('Result: ' + result);
            res.send('Atualizado');
        })
    },

    
    async patchImg(req, res) {
        const { filename } = req.file;
        const { spotid } = req.body;

        await Spot.findByIdAndUpdate(spotid, { 
            $set: {
            thumbnail: filename,
            }
        }, function(error, result) {
            if(error){
                console.log(error);
            }
            console.log('Result: ' + result);
            res.send('Atualizado');
        })
    },
};