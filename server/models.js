const mongoose = require('mongoose');
// const connectionString = 'mongodb://localhost/tasks_api';
mongoose.connect('mongodb://localhost/angular_api', { useNewUrlParser: true });

const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [3, 'Name must at least has 3 charaters'] },
    quo: [{
        quote: { type: String, required: true, minlength: [3, 'Quote must at least has 3 charaters'] },
        vote: { type: String, default: 0 }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Author', AuthorSchema);