import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
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
function RenderComments({ comments }) {
    if (comments != null)
        return (
            comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <h3>Comments</h3>
                        <ul className="list-unstyled">
                            <li>{comment.comment}</li>
                            <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
                        </ul>
                    </div>
                )
            })
        );
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
                        <RenderComments comments={props.comments} />
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

// import React from 'react';
// import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { Link } from 'react-router-dom'



// function RenderComments({ dish_comment }) {
//     if (dish_comment !== null) {
//         const eachDishComment = dish_comment.map((comment) => {
//             return (
//                 <li key={comment.id} >
//                     <p>{comment.comment}</p>
//                     <br />
//                     <p>--{comment.author} {new Intl.DateTimeFormat('en-US',
//                         { year: 'numeric', month: 'short', day: '2-digit' })
//                         .format(new Date(Date.parse(comment.date)))}
//                     </p>
//                 </li>
//             );
//         })
//         console.log("These are initial comments", dish_comment)

//         return (
//             <div className="col-xs-12 col-sm-12 col-md-5">
//                 <Card>
//                     <h4>Comments</h4>
//                     {eachDishComment}
//                 </Card>
//             </div>
//         );

//     }
// }
// function RenderDish({ dish }) {
//     console.log("we are in renderDish func ", dish)
//     if (dish !== null && dish !== undefined) {
//         console.log("Dish exist ", dish)
//         console.log(dish.comments)
//         return (
//             <div key={dish.id} className="row">
//                 <div className="col-xs-12 col-sm-12 col-md-5 m-1">
//                     <Card>
//                         <CardImg width="100%" top src={dish.image} alt={dish.name} />
//                         <CardBody>
//                             <CardTitle>{dish.name}</CardTitle>
//                             <CardText>{dish.description}</CardText>
//                         </CardBody>
//                     </Card >
//                 </div >
//                 {/* {RenderComments(dish.comments)} */}
//                 {/* <RenderComments dish_comment={dish.comments} /> */}

//             </div >
//         )
//     }
//     else {
//         console.log("nothing")
//     }
// }

// const DishDetail = (props) => {

//     console.log("Here are the props ", props)
//     if (props.dish != null) {

//         return (
//             <div className="container">
//                 <div className="row">
//                     <Breadcrumb>

//                         <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
//                         <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
//                     </Breadcrumb>
//                     <div className="col-12">
//                         <h3>{props.dish.name}</h3>
//                         <hr />
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-12 col-md-5 m-1">
//                         <RenderDish dish={props.dish} />
//                     </div>
//                     <div className="col-12 col-md-5 m-1">
//                         <RenderComments comments={props.comments} />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//     else {
//         return (
//             <div></div>
//         )
//     }

// }

// export default DishDetail;

