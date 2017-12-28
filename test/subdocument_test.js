const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdoc', (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "Post Title"}]
    });

    joe.save()
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.posts[0].title === 'Post Title');
      assert(user.posts.length === 1);
      done();
    });
  });

  it('remove subdoc', (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "Post Title"}]
    });

    joe.save()
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      const post = user.posts[0];
      post.remove;
      return user.save();
    })
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.posts.length === 0);
      done();
    })
  });

  it('can add subdoc to an existing record', (done) => {
    joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        user.posts.push( {title: "NewPost"} );
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'NewPost');
        done();
      })
  });
})
