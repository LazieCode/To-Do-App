const express = require('express');
const port = 8000;
const path = require('path');
const Contact = require('../contact_list/models/contact');

const db = require('./config/mongoose');
const Task = require('./models/task');

const app = express();

app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assests'));


var tasks = [
    {
        desc: "Add a task",
        catg: "Work",
        due: "Jun 1,2019"  
    },
    {
        desc: "Project",
        catg: "College",
        due: "Aug 3,2021"  
    }
];

app.get('/', function(req,res){
    // res.send("<h1> Hello </h1>");
    // return res.render('home', {title: "ToDo Tasks", tasks_collection: });
    
    Task.find({}, function(err,task){

        if(err){
            console.log("Error in fetching contacts");
        }

        return res.render('home', {
            title: "TODO Tasks",
            tasks_collection: task
        });

    });

});

app.post('/delete-contact', function(req,res){

    let id = req.body.checked;
    console.log(id);

    const type = typeof(id);


    if(type === "string"){
        Task.findByIdAndDelete(id,function(err){
            if(err){
                console.log("Error in deleting single task");
                return;
            }
        });
    }
    else{
        for(var i = 0; i< id.length; i++)
        {
            Task.findByIdAndDelete(id[i],function(err){
                if(err){
                    console.log("Error in deleting multiple task");
                    return;
                }
            });
        }
    }

    res.redirect('/');
});

app.post('/create-task', function(req,res){
    
    Task.create(req.body, function(err,newTask){

        if(err){
            console.log("Error in creating a new task");
            return;
        }

        console.log('********', newTask);
        return res.redirect('/');
    });
    
});

app.listen(port, function(err){
    if(err){
        console.log("Error in firing the server", err);
    }

    console.log("Server is fired at port " + port);
});