import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes'


/*
These function{addComment,fetchDishes,dishesLoading,dishesFailed,
addDishes} are called an "Action" which will return JS-object
and send this data to their respective "reducers"
*/
export const addComment = (dishId, rating, author, comment) => ({
    //This "Action" will send the JS-object to <comment.js> file 
    //which is a "reducer" for comment-data
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

/*
    "fetchDishes" is a Redux-Thunk
    this is returning an action whereas other
    dishesLoading, dishesFailed & addDishes are
    returning action-object[JS-object]
*/
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000)
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})