import { Component, createComponent } from '../../core/index.js';
import { ProductPrice } from '../Product/index.js';

class SelectedOption extends Component {
  render() {
    const selectedOptionItem = document.createElement('li');
    selectedOptionItem.setAttribute('class', 'selected-option-item');
    const optionName = document.createElement('strong');
    optionName.setAttribute('class', 'option-name');
    optionName.innerText = this.props.optionName;

    const selectedOptionQuantityInputContainer = document.createElement('div');
    selectedOptionQuantityInputContainer.setAttribute(
      'class',
      'select-quantity'
    );
    selectedOptionQuantityInputContainer.append(this.props.quantityInput);

    const selectedOptionPrice = createComponent(ProductPrice, {
      price: this.props.optionPrice,
    });
    selectedOptionQuantityInputContainer.append(selectedOptionPrice);

    selectedOptionItem.append(optionName, selectedOptionQuantityInputContainer);

    return selectedOptionItem;
  }
}

export default SelectedOption;
