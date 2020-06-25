# The redux is explained here

"Store" --> All your application's states as well as data resides here
            in just one big JavaScript object
            It is called "configureStore"
            "DISHES","COMMENTS","PROMOTIONS","LEADERS" are the JavaScript object
            combined into one viz "configureStore".
            Since each JS-object is independent of one another, it is easier
            to have and maintain separate Reducer functions that deal with each of the parts of my state. Thereby each individual "Reducer" will deal with 
            it's own JS-object.
"Reducers" -->  "Reducer" take in two parameters viz "state" and "action"
                inside the "redux" folder, dishes.js,comments.js,promotions.js,leaders.js
                files are the individual "reducers"

## how the code flows or Structure of Code
MainComponent.js file has two functions called as mapStateToProps and 
mapDispatchToProps                