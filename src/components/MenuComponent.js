import React,{Component} from 'react';
import { Card,  CardTitle, CardImg, CardImgOverlay} from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish})
    }

    render() {
        const {dishes, onClick } = this.props;

        const menu = dishes.map(dish => (
            (
                <div key={dish.id} className='col-12 col-md-5 m-1'>
                    <Card onClick={() => onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
                    </Card>
                </div>
            )
        ));

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;