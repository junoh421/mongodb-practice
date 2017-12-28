const assert = require('assert');
const User = require('../src/user');

describe('validating users', () => {
  it('requires a user name', () => {
    joe = new User({ name: undefined });
    validationResult = joe.validateSync();
    message = validationResult.errors.name.message
    assert(message === "Name is required")
  });

  it('requires a user name longer than 2 characters', () => {
    al = new User({ name: 'Al'});
    validationResult = al.validateSync();
    message = validationResult.errors.name.message
    assert(message === "Name must be longer than 2 characters.")
  });

  it('disallows invalid records from being saved', (done) => {
    al = new User({ name: 'Al'});
    al.save()
    .catch((validationResult) => {
      message = validationResult.errors.name.message;
      assert(message === "Name must be longer than 2 characters.")
      done();
    })
  })
})
