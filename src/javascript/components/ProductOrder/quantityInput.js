import { Component } from '../../core/index.js';

class QuantityInput extends Component {
  render() {
    const quantityOption = document.createElement('div');
    quantityOption.setAttribute('class', 'quantity-option');

    const quantityIncreaseButton = document.createElement('button');
    quantityIncreaseButton.type = 'button';
    quantityIncreaseButton.setAttribute('class', 'quantity-plus');

    const increaseButtonIr = document.createElement('span');
    increaseButtonIr.setAttribute('class', 'ir');
    increaseButtonIr.innerText = '수량 추가';
    quantityIncreaseButton.append(increaseButtonIr);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.setAttribute('class', 'quantity-input');
    quantityInput.setAttribute('id', `quantityInput${this.props.product.id}`);

    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('class', 'ir');
    quantityLabel.setAttribute('for', `quantityInput${this.props.product.id}`);
    quantityLabel.innerText = '수량';

    const quantityDecreaseButton = document.createElement('button');
    quantityDecreaseButton.type = 'button';
    quantityDecreaseButton.setAttribute('class', 'quantity-minus');

    const decreaseButtonIr = document.createElement('span');
    decreaseButtonIr.setAttribute('class', 'ir');
    decreaseButtonIr.innerText = '수량 감소';
    quantityDecreaseButton.append(decreaseButtonIr);

    quantityOption.append(
      quantityDecreaseButton,
      quantityInput,
      quantityIncreaseButton,
      quantityLabel
    );

    return quantityOption;
  }
}

export default QuantityInput;
