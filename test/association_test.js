const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    blogPost = new BlogPost({ title: 'blogpost', content: 'content here'});
    comment = new Comment({ content: 'content here'});
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([ joe.save(), blogPost.save(), comment.save()])
    .then( () => done());
  });

  it('saves a relation between a user and blogpost', (done) => {
    User.findOne({ name: 'Joe'}).populate('blogPost')
    .then((user) => {
      assert(user.blogPosts[0].toString() === blogPost._id.toString())
      done();
    })
  });

  it.only('saves full relation', (done) => {
    User.findOne({ name: "Joe" })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      }).then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0]._id.toString() === blogPost._id.toString())
        assert(user.blogPosts[0].comments[0]._id.toString() === comment._id.toString())
        assert(user.blogPosts[0].comments[0].user.name === joe.name)
        
        done();
      })
  })
})
