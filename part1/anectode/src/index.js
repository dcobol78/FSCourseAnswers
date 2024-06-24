import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [likes, setLikes] = useState(Array(props.anecdotes.length).fill(0));
  const buttonName = "next anectode";
  const likeButtonName = "vote";
  const day_title = "Anecdote of the day";
  const all_time_title = "Anectode with most votes";
  const randomAnec = () => {
    const rand = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(rand);
  };

  const addLike = () => {
    const newLikes = [...likes];
    newLikes[selected] += 1;
    setLikes(newLikes);
  };

  return (
    <div>
      <h1>{day_title}</h1>
      {props.anecdotes[selected]}
      <ShowLike like={likes[selected]} />
      <Like handleClick={addLike} text={likeButtonName} />
      <Button handleClick={randomAnec} text={buttonName} />
      <h1>{all_time_title}</h1>
      <MostVote anecdotes={props.anecdotes} likes={likes} />
    </div>
  );
};

const ShowLike = ({ like }) => {
  return (
    <div>
      <p>has {like} likes</p>
    </div>
  );
};

const MostVote = ({ anecdotes, likes }) => {
  let mostLiked = 0;
  let i = 0;
  likes.forEach(function (like, index) {
    if (like >= mostLiked) {
      mostLiked = like;
      i = index;
    }
  });
  return (
    <div>
      {anecdotes[i]}
      <ShowLike like={mostLiked} />
    </div>
  );
};

const Like = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
