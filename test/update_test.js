const assert = require('assert');
const User = require('../src/user');

describe('Update users', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe'} );
    joe.save()
      .then( () => done());
  })

  function updateName(user, done) {
    user
    .then( () => User.find({name: 'Bob'}) )
    .then( (users) => {
      assert(users.length === 1 );
      assert(users[0].name === 'Bob');
      done();
    })
  }

  it('instance set and save', (done) => {
    joe.set('name', "Bob");
    updateName(joe.save(), done);
  });

  it('model instance update', (done) => {
    updateName(joe.update({ name: 'Bob'}), done);
  });

  it('model class update', (done) => {
    updateName(
      User.update({ name: 'Joe'}, { name: 'Bob'}),
      done
    );
  })

  it('model class update single record', (done) => {
    updateName(
      User.findOneAndUpdate({ name: 'Joe'}, { name: 'Bob'}),
      done
    )
  });

  it('modal class update find a record with id', (done) => {
    updateName(
      User.findByIdAndUpdate(joe._id, { name: 'Bob'}),
      done
    )
  })
});
