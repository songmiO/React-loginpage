import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ContentsTab from '../Components/ContentsTab';
import ProductIntro from './ProductIntro';
import NoteInfo from './NoteInfo';
import Keyword from './Keyword';
import './ProductDetailInfo.scss';

class ProductDetailInfo extends Component {
  constructor() {
    super();
    this.state = {
      productData: {},
    };
  }

  getProductData = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    try {
      const response = await fetch('http://localhost:3000/data/mockData.json');
      if (!response.ok) {
        throw new Error(`HTTP Status code: ${response.status}`);
      }

      const result = await response.json();
      const productData = result.products.filter(
        data => data.id === parseInt(id)
      );
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
      <section className="ProductDetailInfo" id="detail">
        <ContentsTab area="detail" />
        <ProductIntro {...productData} />
        <NoteInfo {...productData} />
        <Keyword {...productData} />
      </section>
    );
  }
}

export default withRouter(ProductDetailInfo);
