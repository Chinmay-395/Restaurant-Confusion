import React, { Component } from 'react';
// import { Navbar, NavbarBrand } from 'reactstrap';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Contact from './ContactComponent';
import About from './AboutComponent'
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form'


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        //this will return the object updated by reducer 
        //ie state.dishes has isLoading,errMess,dishes[]
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    /*
        if you want to dispatch something, you'll have to map that to dispatch
        using "mapDispatchToProps" we will import the addComment from action creator 
        from redux "ActionCreators", because we need this action creator function
        in order to obtain an action JavaScript object which we can then dispatch.
        This function will recieve "dispatch" as one of the parameters.  When it 
        receives the dispatch as a, this dispatch is the dispatch function from our 
        store that will received it as a parameters. Which is connected using the
        "connect" method at the bottom
        ###############--------Important---------###############
        WHAT IS DISPATCH?
        ans: dispatch is a function of the Redux store. You call store.dispatch to 
             dispatch an action. This is the only way to trigger a state change.
    */
    addComment: (dishId, rating, author, comment) => {
        /* 
            dishId, rating, author, comment are the inputs by the user
            (dishId is auto-generated), this data is send to the 
            Action-Creators called as addComment which performs the addComment
            function inside the reducer[here the reducer is called "comment.js"]
            and sends in an action-object, which is then given as a parameter to
            the dispatch function will recieve the updated state as JS-object,
            that will be send to "addComment" key [viz inside mapDispatchToProps]
            This key[namely addComment] will be passed into the component as props
        */
        dispatch(addComment(dishId, rating, author, comment))
    },
    /*
        The function "addComment" inside dispatch method will 
        call the "action-creator" and return an Action object, 
        which is then given as a parameter to the "dispatch" function
        --> By default, a connected component receives props.dispatch 
            and can dispatch actions itself.
        --> connect can accept an argument called mapDispatchToProps, which 
            lets you create functions that dispatch when called, and pass 
            those functions as props to your component.
            (In other words mapDispatchToProps allows the component to send
             data which is perfomed by the end-user as "Actions")
    */
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});

class Main extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}
                />
            );
        };



        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu"
                        component={() => <Menu dishes={this.props.dishes} />}
                    />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/aboutus'
                        component={() => <About leaders={this.props.leaders} />}
                    />
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
