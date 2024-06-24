import React from 'react';
import { useSelector } from 'react-redux';

const Comments = ({ blog }) => {
  const comments = useSelector((state) => state.comments);
  return (
    <div>
      <ul>
        {comments
          .filter((c) => c.blog.id === blog.id)
          .map((c) => (
            <li key={c.id}>{c.comment}</li>
          ))}
      </ul>
    </div>
  );
};

export default Comments;
