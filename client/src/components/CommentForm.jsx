// src/components/CommentForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentForm = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("https://test-community.onrender.com/comments")
      .then((response) => response.json())
      .then(setComments);
  }, []);

  const handleAddComment = () => {
    fetch("https://test-community.onrender.com/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newComment, name: name }),
    })
      .then(() => setNewComment(""))
      .then(() => fetch("https://test-community.onrender.com/comments"))
      .then((response) => response.json())
      .then(setComments);
  };

  const userComments = comments.filter((comment) => comment.name === name);

  return (
    <div>
      <div className=" w-full h-screen flex">
        <div className="w-[30%] border-r-2">
          <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[90%] p-5">
              <input
                type="text"
                className="border-gray-400 hover:border-indigo-500 border-[1px] outline-none p-2 w-full rounded-xl mb-2"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="border-gray-400 hover:border-indigo-500 border-[1px] outline-none p-2 w-full rounded-xl"
                placeholder="What's happening?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button
                type="submit"
                className="p-2 w-1/2 bg-indigo-400 hover:bg-indigo-600 transition rounded-xl"
                onClick={handleAddComment}
              >
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="w-[40%] border-r-2 p-2">
          {/* {comments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))} */}
          {comments.map((comment, index) => (
            <div className="w-full border-2 border-gray-500 p-2 rounded-xl mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold" key={index}>
                  {comment.name}
                </span>
              </div>
              <span key={index}>{comment.text}</span>
            </div>
          ))}
        </div>
        <div className="w-[30%] p-2">
          <p className="text-center font-bold text-xl mb-5">Your comments</p>
          {userComments.map((comment, index) => (
            <div className="w-full border-2 border-gray-500 p-2 rounded-xl mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold" key={index}>
                  {comment.name}
                </span>
              </div>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
