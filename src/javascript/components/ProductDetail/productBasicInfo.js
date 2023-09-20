import { Component, createComponent } from '../../core/index.js';
import { SectionHeading } from './index.js';
import { ProductImage, ProductName, ProductPrice } from '../Product/index.js';
import { OrderForm } from '../ProductOrder/index.js';
class ProductBasicInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const basicInfoSection = document.createElement('section');
    basicInfoSection.setAttribute('class', 'product-basic-info');

    const sectionHeading = createComponent(SectionHeading, {
      text: '기본 정보 및 상품 옵션',
    });

    const productImg = createComponent(ProductImage, {
      src: this.props.product.thumbnailImg,
    });

    const productInfoContainer = document.createElement('div');
    productInfoContainer.setAttribute('class', 'product-info');

    const productNamePriceContainer = document.createElement('div');
    productNamePriceContainer.setAttribute('class', 'product-name-price');
    // 상품 이름
    const productName = createComponent(ProductName, {
      name: this.props.product.productName,
    });
    // 상품 가격
    const productPrice = createComponent(ProductPrice, {
      price: this.props.product.price,
      discountRate: this.props.product.discountRate,
    });

    const orderForm = createComponent(OrderForm, {
      product: this.props.product,
    });

    productNamePriceContainer.append(productName, productPrice);
    productInfoContainer.append(productNamePriceContainer, orderForm);
    basicInfoSection.append(sectionHeading, productImg, productInfoContainer);
    return basicInfoSection;
  }
}

export default ProductBasicInfo;
