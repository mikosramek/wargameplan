const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

(async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();
