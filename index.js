// implement your API here


const express = require('express');

const server = express();


const db = require('./data/db.js')

server.use(express.json());// shows express how to read json 

///////////////create new user//////////////////////////////////
server.post('/users', (req, res) => {

    const userInfo = req.body;

    console.log('user info', userInfo);

    db.insert(userInfo).then(user => {
        res.status(201).json(user);
    }).catch(err => { console.log('error', err); res.status(500).json({error: 'Please provide name and bio for the user'})})

})


///////////////get all the users ///////////////////////////////
server.get('/users', (req, res) => {
db.find().then(users => {
    res.status(200).json(users);
}).catch(err => {
    console.log('error', err);
    res.status(500).json({ error: 'failed to get all users from db '});
});
    
});
///////////////get user by id////////////////////////////////////////
server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then( i => {
        res.status(200).json({i})
    }).catch(err => { console.log('error', err); res.status(500).json({error: 'failed to find user '}) })
})


///////////////delete user /////////////////////////////////////////
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id).then(out => {
        res.status(200).json({message: `user with Id ${id} its been deleted`});

    }).catch(err => { console.log('error', err); res.status(500).json({ error: 'failed to delete user from data base' }); })
})


//////////////update user info /////////////////////////////////

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    userUpdate = req.body;

    db.update(id, userUpdate).then(a => {
        res.status(200).json({message: "user has been updated"})
    })
})





const port = 9000;
server.listen(port, () => console.log("\n==== API on Port 9000 ====\n"));