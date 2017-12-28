const assert = require('assert');
const User = require('../src/user');

describe('Delete a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save()
      .then(() => done());
  });

  function deleteUser(user, done) {
    user
    .then( () => User.findOne({ name: 'Joe'}))
    .then( (user) => {
      assert(user === null);
      done();
    })
  }

  it('remove joe model (instance)', (done) => {
    deleteUser(joe.remove(), done);
  });

  it('remove joe (class)', (done) => {
    deleteUser(joe.remove({ name: 'Joe'}), done);
  })

  it('remove joe (class method)', (done) => {
    deleteUser(User.findOneAndRemove({ name: 'Joe'}), done);
  })

  it('remove joe (class method)', (done) => {
    deleteUser(User.findByIdAndRemove(joe._id), done);
  })
});
