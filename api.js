const client = require('./connection.js')
const express = require('express'); 
const app = express(); 


const bodyParser = require('body-parser') //body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.json())           // support parsing of application/json type post data


// in order to read HTTP POST data , we have to use "body-parser" node module. body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body

// client.connect();

app.get('/1stapi', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
        res.send(result.rows);
        // console.log(result.rows);
          
        }
    });
    client.end;
})


app.get('/1stapi/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.post('/apipost', (req, res)=> {
    const user = req.body;
     console.log(res.body);

    let insertQuery = `insert into users (id,Name,location, age) 
                       values('${user.id}',  '${user.Name}', '${user.location}','${user.age}')`
    console.log(insertQuery);

    client.query(insertQuery, (err, result)=>{
        if(!err){
            console.log(result);
            res.send('Insertion was successful')
        }
        else{ res.send(err.message); }
    })
    client.end;
    // res.send(user);
})




app.put('/apiput/:id', (req, res)=> {
    let user = req.body;
    
    let updateQuery = `update users
                           
                           set age ='${user.age}',
                           address ='${user.address}',
                          salary=' ${user.salary}',
                           name =  '${user.name}'                     
                           where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})





app.delete('/delusers/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})





app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
})