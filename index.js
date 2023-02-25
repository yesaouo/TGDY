const express = require('express');
const app = express();
const server = require('http').Server(app);
const PORT = process.env.PORT || 3000;
const MongoClient= require('mongodb').MongoClient;
const url= "mongodb+srv://yesa:A8746z@cluster0.uiviw1n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function getUser(acc,pas = null) {
    try {
        const client = new MongoClient(url);
        const database = client.db("TGDY");
        const user = database.collection("user");
        let query = {};
        if(pas == null) query = { Account: acc };
        else query = { Account: acc, Password: pas };
        return await user.findOne(query);
    } finally {
        await client.close();
    }
}
async function insertUser(userObj) {
    try {
        const client = new MongoClient(url);
        const database = client.db("TGDY");
        const user = database.collection("user");
        const result = await user.insertOne(userObj);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
async function updateUser(acc,pas,updateObj) {
    try {
        const client = new MongoClient(url);
        const database = client.db("TGDY");
        const user = database.collection("user");
        const filter = { Account: acc, Password: pas };
        const options = { upsert: false };
        const updateDoc = { $set: updateObj };
        const result = await user.updateOne(filter, updateDoc, options);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    } finally {
        await client.close();
    }
}

app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html');
});
app.get('/login', async(req, res) => {
    try {
        const acc = req.query.acc;
        const pas = req.query.pas;
        const user = await getUser(acc,pas);
        if(user){
            console.log(user.Name+' login');
            res.send(user);
        }else{
            res.send("Account or password incorrect");
        }
    } catch (error) {res.send("Error");}
});
app.get('/signup', async(req, res) => {
    try {
        const acc = req.query.acc;
        const pas = req.query.pas;
        const name = req.query.name;
        if(await getUser(acc)){
            res.send("This account is already used");
        }else{
            let newUser = {
                Account: acc,
                Password: pas,
                Name: name,
                Photo: 'img/user.png',
                Coin: 1000,
                Diamond: 0
            }
            insertUser(newUser);
            res.send("Registration success");
        }
    } catch (error) {res.send("Error");}
});
app.get('/changename', async(req, res) => {
    try {
        const acc = req.query.acc;
        const pas = req.query.pas;
        const name = req.query.name;
        updateUser(acc,pas,{Name: name});
        res.send("Rename success");
    } catch (error) {res.send("Error");}
});
app.get('/changephoto', async(req, res) => {
    try {
        const acc = req.query.acc;
        const pas = req.query.pas;
        const photo = req.query.photo;
        updateUser(acc,pas,{Photo: photo});
        res.send("Change success");
    } catch (error) {res.send("Error");}
});
app.get('/changediscord', async(req, res) => {
    try {
        const acc = req.query.acc;
        const pas = req.query.pas;
        const dcname = req.query.dcname;
        const dcnum = req.query.dcnum;
        const dc = `${dcname}#${dcnum}`;
        updateUser(acc,pas,{Discord: dc});
        res.send("Update success");
    } catch (error) {res.send("Error");}
});

server.listen(PORT, () => {
    console.log("Server Started. "+PORT);
});