const { test } = require('node:test')
const assert = require('node:assert')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let favorite = blogs[0]
  for (const blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  }

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  const authorCount = {};
  blogs.forEach(blog => {
    if (authorCount[blog.author]) {
      authorCount[blog.author]++;
    } else {
      authorCount[blog.author] = 1;
    }
  })

  let maxBlogs = 0;
  let topAuthor = null;
  for (const author in authorCount) {
    if (authorCount[author] > maxBlogs) {
      maxBlogs = authorCount[author];
      topAuthor = author;
    }
  }

  if (topAuthor === null) {
    return null
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs)=>{
  const likesCount = {}

  blogs.forEach(blog=>{
    if (likesCount[blog.author]){
      likesCount[blog.author] += blog.likes;
    }else{
      likesCount[blog.author] = blog.likes
    }
  })

  let maxLikes = 0;
  let topAuthor = null;

  for (const author in likesCount){
    if (likesCount[author]> maxLikes){
      maxLikes = likesCount[author];
      topAuthor=author
    }
  }

  if (topAuthor === null){
    return null;
  }

  return {
    author:topAuthor,
    likes:maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}