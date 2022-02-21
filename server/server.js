const express = require('express'); //Line 1

const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://investment:investment@cluster0.tcbe8.mongodb.net/Historical_Stock_Data?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   // const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   // console.log(collection);
//   //var collection = client.db().collection("Historical_Stock_Data");
//   console.log();
//   app.get('/',(request, response) => {
//     client.db('Historical_Stock_Data').collection('SPY').find().toArray()
//     .then(data => {
//       console.log(data);
//       response.render('index.html', { info: data })
//     })
//     .catch(error => console.error(error))
//   });
//   client.close();
// });


// Replace the following with your Atlas connection string                                                                                                                                        
const uri = "mongodb+srv://investment:investment@cluster0.tcbe8.mongodb.net/Historical_Stock_Data?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// The database to use
const dbName = "Historical_Stock_Data";
app.get('/',(request, response) => {
                   
  async function run() {
    try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
    
      // Use the collection "people"
      // const col = db.collection("Historical_Stock_Data");
      const col = db.collection("SPY");
      //console.log(col);

      const query = { "year": "2020" };
      const cursor = col.find(query);
      await cursor.forEach(console.dir);  
      var log = JSON.parse(cursor);
      console.log(log);

      } catch (err) {
        console.log(err.stack);
    }

    finally {
      await client.close();
    }
  }
  run().catch(console.dir);
}); 