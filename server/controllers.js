const Author = require('./models')
const path = require('path');


module.exports = {

    getAllTask: (req, res) => {
        Author.find().then(data => res.json(data)).catch(err => res.json(err))
    },

    getOneTask: (req, res) => {
        const ID = req.params.id;
        Author.find({ _id: ID }).then(data => {
            console.log('successfully get one!');
            res.json(data)
        }).catch(err =>
            res.json(err)
        )
    },

    createTask: (req, res) => {
        const DATA = req.body;
        Author.create(DATA).then(data => res.json(data)).catch(err => res.json(err))
    },

    // insertManyTask: (req, res) => {
    //     const DATA = req.body;
    //     Author.insertMany(DATA).then(data => res.json(data)).catch(err => res.json(err))

    // },

    updateTask: (req, res) => {
        const DATA = req.body;
        const ID = req.params.id;
        Author.findOneAndUpdate({ _id: ID }, DATA, { runValidators: true, new: true }).then(data => res.json(data)).catch(err => res.json(err))
    },

    deleteTask: (req, res) => {
        const ID = req.params.id;
        Author.findOneAndDelete({ _id: ID }).then(data => res.json(data)).catch(err => releaseEvents.json(err))
    },

    // deleteAllTask: (req, res) => {
    //     Author.deleteMany({}).then(data => res.json(data)).catch(err => releaseEvents.json(err))
    // },

    /////

    createQuote: (req, res) => {
        const DATA = req.body;
        const ID = req.params.id;
        Author.findOneAndUpdate({ _id: ID }, { $push: { quo: DATA } }, { runValidators: true, new: true }).then(data => res.json(data)).catch(err => res.json(err))
    },

    updateQuote: (req, res) => {
        const DATA = req.body;
        const ID = req.params.id;
        const ID2 = req.params.idd;
        Author.findOneAndUpdate({ _id: ID, "quo._id": ID2 }, { $set: { "quo.$.vote": DATA['vote'] } }, { runValidators: true, new: true }).then(data => res.json(data)).catch(err => res.json(err))
    },

    deleteQuote: (req, res) => {
        const ID = req.params.id;
        const ID2 = req.params.idd;
        Author.findOneAndUpdate({ _id: ID }, { $pull: { quo: { _id: ID2 } } }).then(data => res.json(data)).catch(err => releaseEvents.json(err))
    },

    /////

    goToAngularRoute: (req, res) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    }

}