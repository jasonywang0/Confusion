import React,{Component} from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardText, CardImg, List, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

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
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
                                    <Label htmlFor="name">Your Name</Label>
                                </Col>
                                <Col xs={12}>
                                    <Control.text 
                                        model=".name" 
                                        id='name' 
                                        name='name'
                                        placeholder='Your Name'
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}            
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
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
                    <CommentForm/>           
                </List>
            </div>
        )
    }

    const DishDetail = ({dish, comments}) => {
        if (!dish) return <div></div>
        return <RenderDish dish={dish} comments={comments}/>
    }

export default DishDetail;