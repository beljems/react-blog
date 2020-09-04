import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getPosts,
  getPost,
  updatePost,
  addPost,
  getUpdatedPost,
  addComment,
} from './../redux/modules/post/postActions'

export default (id) => {
  const dispatch = useDispatch();
  const {posts, post, comment, updating} = useSelector(state => state.post);
  const [postItem, setPostItem] = useState({});

  useEffect(() => {
    if(id) {
      dispatch(getPost({ id: parseInt(id) }))
    } else {
      dispatch(getPosts())
    }
  }, [id, posts, dispatch])

  useEffect(() => {
    if(updating) {
      const article = posts.filter(obj => obj.id === parseInt(id))
      setPostItem(article[0])
    }
  }, [id, posts, updating])

  return {
    posts,
    post,
    comment,
    postItem,
    updating,
    addPost(data) {
      dispatch(addPost(data))
    },
    updatePost(data) {
      dispatch(updatePost(data))
    },
    getUpdatedPost(data) {
      dispatch(getUpdatedPost(data))
    },
    addComment(data) {
      dispatch(addComment(data))
    },
    getPost(data) {
      dispatch(getPost(data))
    }
  }
}
