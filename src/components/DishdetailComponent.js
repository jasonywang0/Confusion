import React,{Component} from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, List} from 'reactstrap';


    function RenderDish({dish, comments}) {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <Card>
                            <CardImg src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderComments comments={comments}/>
                    </div>
                </div>
            </div>
        )
    }

    function RenderComments({comments}) {
        if (comments === null) return <div></div>
        return (
            <div>
                <h4>Comments</h4>
                <List type="unstyled">
                    {
                        comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <div>{comment.comment}</div>
                                    <br />
                                    <div>{`-- ${comment.author}, ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</div>
                                    <br />
                                </li>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    const DishDetail = ({dish, comments}) => {
        if (!dish) return <div></div>
        return <RenderDish dish={dish} comments={comments}/>
    }

export default DishDetail;