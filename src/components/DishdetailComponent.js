import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, Button, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
    console.log('dish', dish)
    if (dish != null)
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return (
            <div></div>
        );
}
// function RenderComments({ comments, addComment, dishId }) {
//     if (comments != null)
//         return (
//             comments.map((comment) => {
//                 return (
//                     <div key={comment.id}>
//                         <h3>Comments</h3>
//                         <ul className="list-unstyled">
//                             <li>{comment.comment}</li>
//                             <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
//                         </ul>
//                         <CommentForm dishId={dishId} addComment={addComment} />
//                     </div>
//                 )
//             })
//         );
//     else
//         return (
//             <div></div>
//         );
// }
function RenderComments({ comments, addComment, dishId }) {
    if (comments != null) {
        let commentList = comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                </div>
            )
        })
        return (
            <React.Fragment>
                <h3>Comments</h3>
                {commentList}
                <CommentForm dishId={dishId} addComment={addComment} />
            </React.Fragment>
        );
    }
    else
        return (
            <div></div>
        );
}



const DishDetail = (props) => {
    console.log('called')
    if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                        {/* <CommentForm dishId={dishId} addComment={addComment} /> */}
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}


export default DishDetail;


/*
    -- Assignment-3 
    -- creating a CommentForm new class component
*/
const required = (val) => val && val.length;
const maxRating = (len) => (val) => !(val) || (val.length <= len);
const minRating = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
    }
    render() {
        return (
            <React.Fragment>

                <Button outlined onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                        </Button>


                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="ratings" md={2}>Ratings</Label>

                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                        validators={{
                                            required, minRating: minRating(1), maxRating: maxRating(5)
                                        }}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        )
    }
}



