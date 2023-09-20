import { Component, createComponent } from '../../core/index.js';
import { QuantityInput } from './index.js';

class OrderForm extends Component {
  render() {
    const orderForm = document.createElement('form');
    orderForm.setAttribute('class', 'product-order-form');

    const productOptionContainer = document.createElement('div');
    productOptionContainer.setAttribute('class', 'product-option');

    const deliveryTitle = document.createElement('span');
    deliveryTitle.setAttribute('class', 'delivery-title');
    deliveryTitle.innerText = `택배 배송 / ${
      this.props.product.shippingFee > 0
        ? `${this.props.product.shippingFee}원`
        : '무료 배송'
    }`;

    const selectedProductContainer = document.createElement('div');
    selectedProductContainer.setAttribute('class', 'selected-product');
    const quantityInput = createComponent(QuantityInput, this.props);
    selectedProductContainer.append(quantityInput);

    const totalPriceContainer = document.createElement('div');
    totalPriceContainer.setAttribute('class', 'total-price');

    const totalPriceTitle = document.createElement('span');
    totalPriceTitle.setAttribute('class', 'title');
    totalPriceTitle.innerText = '총 상품금액';

    const totalOrderInfo = document.createElement('div');
    totalOrderInfo.setAttribute('class', 'total-order-info');

    const productQuantity = document.createElement('strong');
    productQuantity.setAttribute('class', 'quantity');
    const productQuantityNum = document.createElement('span');
    // quantityInput 기능 구현되면서 같이 반영하기
    productQuantityNum.innerText = 1;

    productQuantity.append('총 수량', productQuantityNum, '개');

    const totalPrice = document.createElement('strong');
    totalPrice.setAttribute('class', 'price l-price');
    totalPrice.innerText = this.props.product.price;

    const priceType = document.createElement('span');
    priceType.innerText = '원';
    totalPrice.append(priceType);

    totalOrderInfo.append(productQuantity, totalPrice);
    totalPriceContainer.append(totalPriceTitle, totalOrderInfo);

    productOptionContainer.append(deliveryTitle, selectedProductContainer);
    orderForm.append(productOptionContainer, totalPriceContainer);
    return orderForm;
  }
}

export default OrderForm;
