import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const RecipeContext = createContext();

export const RecipeProvider = (props) => {
  const API_ID = "29f808e6";
  const API_KEY = "172c8533603f02665a8920e3ee1ea944";
  const [queryString, setQueryString] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = (searchQuery, filterQuery) => {
    const actualUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}${filterQuery}`;
    if (actualUrl !== queryString) {
      setLoading(true);
      setRecipes([]);
      setQueryString(actualUrl);
      getData(actualUrl);
    }
  };

  const getData = (url) => {
    Axios.get(url).then((resp) =>
      resp.data.hits.map((data) =>
        setRecipes((prevRecipes) => [...prevRecipes, data.recipe])
      )
    );
  };

  useEffect(() => {
    if (recipes.length > 5) {
      setLoading(false);
    }
  }, [recipes]);

  useEffect(() => {
    if (queryString !== "") {
      getData(queryString);
    }
  }, [queryString]);

  return (
    <RecipeContext.Provider value={{ search, recipes, loading, setLoading }}>
      {props.children}
    </RecipeContext.Provider>
  );
};
