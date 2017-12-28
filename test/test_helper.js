const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // ES6 promises

before((done) => {
  mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
  mongoose.connection
  .once('open', () => { done(); })
  .on('error', (error) => {
    console.log("Connecting...", error)
  });
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
