import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
//file was deleted and not needed
// import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

//import from react-redux library
//useDispatch is a function used to assign to a variable, dispatching to the store by adding an action
//useSelector is a similar function that takes current states and returns whatever we want from it
//will be imported on all components that need to read data from the state and/or dispatch an action to it
import { useDispatch, useSelector } from "react-redux";

function CategoryMenu() {
  //comment out and replace with new code from react-redux library
  // const [state, dispatch] = useStoreContext();

  //calling new const by adding actions to the argument
  //will be used on all components that need to read data from the state and/or dispatch an action to it
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
