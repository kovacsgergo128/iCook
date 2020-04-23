import React, { createContext, useState, useContext, useEffect } from "react";
import { SelectedRecipeContext } from "./SelectedRecipeContext";
import { v4 as uuidv4 } from "uuid";

import Axios from "axios";

export const CommentContext = createContext();

export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);
  const [isCommentCanBeShown, setIsCommentCanBeShown] = useState(false);

  // selectedRecipeId-t URI-ra lecserélni (uri)
  const { selectedRecipe } = useContext(SelectedRecipeContext);
  const selectedRecipeId = selectedRecipe.label
    .toLowerCase()
    .replace(/ /g, "-");

  const URL = `http://localhost:8080/recipe/${selectedRecipeId}/comments`;

  const getComments = () => {
    setIsCommentCanBeShown(true);
    Axios.get(URL).then((resp) => setComments(resp.data));
  };

  // paramétereket kiszervezni úgy mint URL-t
  const addComment = (event) => {
    const newComment = document.getElementById("new-comment").value;
    const newCommentId = uuidv4();
    event.stopPropagation();
    Axios.post(
      URL,
      {
        id: newCommentId,
        content: newComment,
        submissionTime: null,
        recipeId: selectedRecipeId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => setComments(resp.data));
  };

  useEffect(() => {}, [comments]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        getComments,
        addComment,
        isCommentCanBeShown,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
