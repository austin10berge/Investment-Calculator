const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000; 
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
//app.use(express.static('public'));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
// perform a database connection when server starts
dbo.connectToServer(function (err) {
  if (err) console.error(err);

});
console.log(`Server is running on port: ${port}`);
});

// This displays message that the server running and listening to specified port
// app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); 

// const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace the following with your Atlas connection string                                                                                                                                        
// const uri = "mongodb+srv://investment:investment@cluster0.tcbe8.mongodb.net/Historical_Stock_Data?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// // The database to use
// const dbName = "Historical_Stock_Data";
// app.get('/',(request, response) => {
                   
//   async function run() {
//     try {
//       await client.connect();
//       console.log("Connected correctly to server");
//       const db = client.db(dbName);
    
//       // Use the collection "people"
//       // const col = db.collection("Historical_Stock_Data");
//       const col = db.collection("SPY");
//       //console.log(col);

//       const query = { "year": "2022" };
//       const cursor = col.find(query);
//       //await cursor.forEach(console.dir);  
      
//       await cursor.forEach(doc => console.log(doc.data));

      

//       } catch (err) {
//         console.log(err.stack);
//     }

//     finally {
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
// }); 