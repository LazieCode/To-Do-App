const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    desc:{
        type: String,
        required: true
    },

    catg:{
        type: String,
        required: true
    },

    due:{
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema); //modelName should be capital by practice 

module.exports = Task;