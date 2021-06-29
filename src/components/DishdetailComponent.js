import React,{Component} from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardText, CardImg, List, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function RenderDish({dish, comments, addComment, dishId}) {
    return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
}

function RenderComments({comments, addComment, dishId}) {
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
                <CommentForm dishId={dishId} addComment={addComment}/>           
            </List>
        </div>
    )
}



class CommentForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    } 

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.toggleModal} className='bg-white text-dark'> <span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            
                            <Row className='form-group'>
                                <Col xs={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                </Col>
                                <Col xs={12}>
                                    <Control.select type="number" defaultValue='1' className='form-control' model=".rating" id='rating' name='rating'>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Control.select>
                                </Col>
                            </Row>

                          <Row className='form-group'>
                                <Col xs={12}>
                                    <Label htmlFor="author">Your Name</Label>
                                </Col>
                                <Col xs={12}>
                                    <Control.text 
                                        model=".author" 
                                        id='author' 
                                        author='author'
                                        placeholder='Your Name'
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}            
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

                            <Row className='form-group'>
                                <Col xs={12}>
                                    <Label htmlFor="name">Your Comment</Label>
                                </Col>
                                <Col xs={12}>
                                    <Control.textarea 
                                        model=".comment" 
                                        id="comment" 
                                        name="comment"
                                        rows="6"
                                        className="form-control" 
                                    />         
                                </Col>
                            </Row>




                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>             
            </React.Fragment>
        )
    }

}



    const DishDetail = ({dish, comments, addComment}) => {
        if (!dish) return <div></div>
        return (
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{dish.name}</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish={dish}/>
                    <RenderComments comments={comments} addComment={addComment} dishId={dish.id}/>
                </div>
            </div>
        )
    }

export default DishDetail;