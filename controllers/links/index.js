const {url:URLModel} = require('../../models');
// const model = require('../../models').url 도 됨.
const utils = require('../../modules/utils')

module.exports = {
get: async (req,res) => {
    const data = await URLModel.findAll();
    res.status(200).json(data);
},

redirect: (req, res) => {
    URLModel.findOne({ where: {
        id: req.params.id
    } })
    .then(result => {
        if(result) {
            return result.update({
                visits: result.visits + 1
            });
        } else {
            res.sendStatus(204);
        }
    })
    .then(result => {
        res.redirect(result.url)
    })
    .catch(error => {
        res.sendStatus(500);
    })
},

post: (req,res) => {
    const {url} = req.body;

    if(!utils.isValidUrl(url)){
        return res.sendStatus(400);
    }

    utils.getUrlTitle(url, (err, title) => {
        if(err){
            return res.sendStatus(400);
        }
        
        URLModel.findOrCreate({
            where: {
                url: url
            },
            defaults: {
                title: title
            }
        })
        .then(([result, created]) => {
            if(!created){
                return res.status(201).json(result);
            }
            res.status(201).json(result);
        })
        .catch(error => {
            res.sendStatus(500);
        });
    });
},
}