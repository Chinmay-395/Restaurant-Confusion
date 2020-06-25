import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes'
import { baseUrl } from '../shared/baseUrl'

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

    return fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)));
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
//+++++++++++++++++++ this is regarding Comments +++++++++++++++++++//
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});