const assert = require('assert');
const User = require('../src/user')

describe('Reading users', () => {
  let joe;

  beforeEach((done) => {
    alex = new User({ name: "Alex"});
    joe = new User({ name: "Joe" });
    jen = new User({ name: "Jen"});
    maria = new User({ name: "Maria"})

    Promise.all([ alex.save(), joe.save(), jen.save(), maria.save()])
    .then( () => done());
  });

  it('find all users with name joe', (done) => {
    User.find({ name: "Joe"} ).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString())
      done();
    })
  });

  it('find a user with a particular id', (done) => {
    User.findOne({_id: joe._id}).then((user) => {
      assert(user.name === 'Joe')
      done();
    });
  })

  it('skip and limit result set', (done) => {
    User.find({}).sort({ name: 1 }).skip(1).limit(2).then((users) => {
      assert( users.length === 2 );
      assert( users[0].name === 'Jen');
      assert( users[1].name === 'Joe');
      done();
    })
  })
});
