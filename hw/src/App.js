import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import { prductlistarr } from './data';
import AddOrUpdate from './AddOrUpdate';

export default class IndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdateColFlex: false,
      isUpdateStyle: false,
      isSelectProduct: null,
      isSort: false,
      ItemList: prductlistarr,
    };
  }

  UpdateItemFunction = (item) => {
    const updatedList = this.state.ItemList.map((item2) => {
      if (item2.index === item.index) {
        return { ...item };
      }
      return item2;
    });

    this.setState({
      ItemList: updatedList,
    });
    console.log(updatedList);
  }

  addItem = (Item) => {
    const newList = [
      ...this.state.ItemList,
      {
        index: this.state.ItemList.length + 1,
        vendor: Item.vendor,
        price: Item.price,
        model: Item.model,
        url: Item.url,
      },
    ];

    this.setState({
      ItemList: newList,
    });
  };

  UpdateBtn = (item) => {
    this.setState({
      isUpdateStyle: true,
      isUpdateColFlex: true,
      isSelectProduct: item,
    });
  };

  handleButtonClick = () => {
    this.setState((prevState) => ({
      isUpdateColFlex: !prevState.isUpdateColFlex,
      isUpdateStyle: false,
    }));
  };

  handleSortClick = () => {
    const arrayptr = [...this.state.ItemList];
    arrayptr.sort((a, b) => b.price - a.price);
    if (this.state.isSort) {
      arrayptr.reverse();
    }
    this.setState((prevState) => ({
      isSort: !prevState.isSort,
      ItemList: arrayptr,
    }));
  };

  handleSortAZClick = () => {
    const arrayptr = [...this.state.ItemList];
    arrayptr.sort((a, b) => a.model.localeCompare(b.model));
    if (this.state.isSort) {
      arrayptr.reverse();
    }
    this.setState((prevState) => ({
      isSort: !prevState.isSort,
      ItemList: arrayptr,
    }));
  };

  render() {
    const updateColClass = this.state.isUpdateColFlex ? 'flex-column' : 'none';
    const size = this.state.isUpdateColFlex ? '7' : '12';
    const buttonText = this.state.isUpdateColFlex ? 'Back' : 'Add Car';

    return (
      <div className='bg-primary container2'>
        <Row className='' style={{ position: 'relative' }}>
          <Col
            className={`bg-dark p-0 m-0 d-${updateColClass}`}
            xs='12'
            sm='12'
            md='5'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AddOrUpdate
              addItem={this.addItem}
              isUpdate={this.state.isUpdateStyle}
              UpdateItem={this.state.isSelectProduct}
              UpdateItemFunction={this.UpdateItemFunction}></AddOrUpdate>
          </Col>

          <Col className='p-0 m-0 ' xs='12' sm='12' md={size}>
            <div className='ProductListDiv-1'>
              <button className='btn btn-dark' onClick={this.handleButtonClick}>
                {buttonText}
              </button>
              <Button className='btn btn-success' onClick={this.handleSortClick}>
                {'0<100'}
              </Button>
              <Button className='btn btn-wrong' onClick={this.handleSortAZClick}>
                {'A-Z'}
              </Button>
            </div>
            <section className='ProductListDiv-2'>
              <ProductList Productlist={this.state.ItemList} UpdateBtn={this.UpdateBtn}></ProductList>
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}
