/*-------------------------- This is a Redux-Reducer corresponding to comments state --------------------------*/

import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errMess: null, comments: action.payload }

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, comments: [] }


        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            //the state is "COMMENTS" which we have imported in the firstline
            //since this function is suppose to add a new comment to the
            //dishes we require new "comment.id" for this,
            //we use state.length which will give us the value of total number
            //of comments that already exist; Since the comment.id starts from 
            //zero, the state.length will the new comment.id
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return { ...state, comments: state.comments.concat(comment) };

        default:
            return state;
    }
};