import { Component } from '../../core/index.js';

class ProductPrice extends Component {
  render() {
    const productPriceContainer = document.createElement('div');
    productPriceContainer.setAttribute('class', 'product-price');

    const productPrice = document.createElement('strong');
    productPrice.setAttribute('class', 'price m-price');

    const productType = document.createElement('span');
    productType.innerText = '원';
    productPriceContainer.appendChild(productPrice);
    if (this.props.discountRate > 0) {
      // 할인된 금액 계산
      // 할인과 관련된 element를 추가한다.
      const discountRateContainer = document.createElement('div');
      discountRateContainer.setAttribute('class', 'price-discount');

      const originPrice = document.createElement('strong');
      originPrice.setAttribute('class', 'price-strikethrough');
      originPrice.innerText = `${this.props.price.toLocaleString('ko-KR')}${
        productType.innerText
      }`;

      const discountRateDisplay = document.createElement('strong');
      discountRateDisplay.setAttribute('class', 'discount-rate');
      discountRateDisplay.innerText = `${this.props.discountRate.toLocaleString(
        'ko-KR'
      )}%`;

      this.props.price =
        this.props.price - this.props.price * (0.01 * this.props.discountRate);

      discountRateContainer.appendChild(originPrice);
      discountRateContainer.appendChild(discountRateDisplay);
      productPriceContainer.appendChild(discountRateContainer);
    }

    productPrice.innerText = this.props.price.toLocaleString('ko-KR');
    productPrice.appendChild(productType);

    return productPriceContainer;
  }
}

export default ProductPrice;
