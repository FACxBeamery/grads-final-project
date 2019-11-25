const assert = require("assert");
const mongoClient = require("mongodb").MongoClient;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/db";

const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

let _db, _client;

const initDb = () => {
    return new Promise((resolve, reject) => {
        const dbConnect = (error, client) => {
            if (error) {
                reject(error);
            } else {
                console.log("Initializing database!");
                _client = client;
                _db = client.db("VibeAtBeamery");

                // _db.dropDatabase();

                _db.collection("Surveys").deleteMany({});
                _db.collection("Questions").deleteMany({});
                _db.collection("Employees").deleteMany({});
                _db.collection("Admins").deleteMany({});

                _db.collection("Surveys").insertOne({
                    message: "Created Surveys collection!"
                });

                _db.collection("Questions").insertOne({
                    message: "Created Questions collection!"
                });

                _db.collection("Employees").insertOne({
                    message: "Created Employees collection!"
                });

                _db.collection("Admins").insertOne({
                    message: "Created Admins collection!"
                });

                resolve(_db);
            }
        };

        if (_db) {
            console.warn("Trying to initialise database again!");
            resolve(_db);
        }

        mongoClient.connect(mongoUri, connectionConfig, dbConnect);
    });
};

const getDb = () => {
    assert.ok(
        _db,
        "Database has not been initialised. Please call initDb first!"
    );
    return _db;
};

const closeDb = () => {
    _db = null;

    return _client.close();
};

module.exports = { getDb, initDb, closeDb };
