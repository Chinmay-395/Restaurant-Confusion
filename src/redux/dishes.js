/*-------------------------- This is a Redux-Reducer corresponding to dishes state --------------------------*/
import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
    //These are set initially
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, errMess: null, dishes: action.payload }
        /*
            the syntax `...state` says that it will modify the <state> variable
            passed into the "Dishes" function.
            ie isLoading initially was true but when "ADD_DISHES" Redux-Action is
            invoked this reducer updates it to false; likewise errMess & dishes[].
            Thereby we are not mutating the original state.
        */

        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errMess: null, dishes: [] }

        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, dishes: [] }
        default:
            return state;
    }
}