import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import useAuth from './../hooks/useAuth'
import usePost from './../hooks/usePost'

import Breadcrumbs from './../components/Breadcrumbs';
import Comment from './../components/Comment';
import Button from './../components/Button';
import './SinglePage.scss';

const SinglePage = () => {
  const history = useHistory();
  const {id} = useParams();
  const {isLoggedIn} = useAuth();
  const {postItem} = usePost(id);

  const handleClick = e => {
    e.preventDefault();
    history.push(`/news/edit/${id}`)
  }

  let postDate1, postDate2
  if(postItem.createdAt) {
    postDate1 = moment(postItem.createdAt).format('YYYY-MM-DD')
    postDate2 = moment(postItem.createdAt).format('YYYY.MM.DD')
  } else {
    postDate1 = ''
    postDate2 = ''
  }

  return (
    <>
      <Breadcrumbs title={postItem.title} />
      <div className="l-container single-body">
        {isLoggedIn &&
        <div className="content-header">
          <div className="content-header-item content-header-item-right">
            <div className="content-header-link">
              <Button modifier="button-default" label="Edit Post" onClick={e => handleClick(e)} />
            </div>
          </div>
        </div>}

        <span className="single-date">
          <time dateTime={postDate1}>
            {postDate2}
          </time>
        </span>

        <h1>{postItem.title}</h1>
        <div className="single-feature-image"
          style={{ backgroundImage: `url(${postItem.image})` }}></div>
        {postItem.content ? <p>{postItem.content}</p> : ''}

      </div>
      {postItem.comments &&
      <Comment
        postId={postItem.id}
        comments={postItem.comments}
      />}
    </>
  );
}

export default SinglePage;
