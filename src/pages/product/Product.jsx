import React, { Component } from 'react';
import Container from '../../components/Container/Container';
import ProductDetailHead from './ProductDetailHead/ProductDetailHead';
import ProductDetailInfo from './ProductDetailInfo/ProductDetailInfo';
import ProductReview from './ProductReview/ProductReview';
import './Product.scss';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      productData: {},
    };
  }

  getProductData = async () => {
    const { pathname } = this.props.location;
    const { id } = this.props.match.params;
    const volume = pathname.split('/')[2];

    try {
      const response = await fetch('/data/mockData.json');
      if (!response.ok) {
        throw new Error(`HTTP Status code: ${response.status}`);
      }

      const result = await response.json();
      const productData = result.products.filter(
        data => data.id === parseInt(id)
      );
      productData[0].price = productData[0].price[volume];

      return this.setState({ productData: productData[0] });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.getProductData();
  }

  render() {
    const { productData } = this.state;

    return (
      <Container>
        <ProductDetailHead productData={productData} />
        <ProductDetailInfo productData={productData} />
        <ProductReview />
      </Container>
    );
  }
}

export default Product;
