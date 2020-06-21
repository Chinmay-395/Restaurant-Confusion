import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};
/*
    -- the syntax `export const Reducer = (state=initialState,action)` means that
    -- if the <state> variable isn't defined (or 'undefined') 
    -- then initialize it with <initialState>

*/
export const Reducer = (state = initialState, action) => {
    return state;
}