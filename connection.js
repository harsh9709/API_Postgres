const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "harshit",
    database: "test"
})
client.connect(err => {
    if (err) {
      console.error('connection error')
    } else {
      console.log('Database connected')
    }
  })


client.query(`select * from users`, (err,res)=>{
    if(!err){
      console.log('NO errors')
        // console.log(res.fields); 
        // console.log(res.rows)
    }else {
        console.log(err.message);
    }
    client.end;
})
module.exports = client  


//Use the exports keyword to make properties and methods available outside the module file.
//In the file, add a function as a property of the exports object. This will make the function available to other code:

// exports.printMsg = function() {
//   console.log("This is a message from the demo package");
// }

