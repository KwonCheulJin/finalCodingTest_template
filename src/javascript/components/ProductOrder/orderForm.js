import { Component, createComponent } from '../../core/index.js';
import {
  MessageModal,
  OptionSelector,
  QuantityInput,
  SelectedOption,
} from './index.js';
import { OrderButton, CartButton, ProductLikeButton } from '../Button/index.js';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.product.option.length > 0 ? 0 : 1,
      selectedProductOptions: [],
      cartModal: false,
    };
  }

  addSelectedProductOption(optionId) {
    const isExist =
      this.state.selectedProductOptions.filter(
        item => item.optionId === optionId
      ).length > 0;
    if (isExist) return;

    const newSelectedProductOption = {
      optionId,
      quantity: 1,
    };
    const newSelectedProductOptions = this.state.selectedProductOptions;
    const selectedProductOptions = [
      ...newSelectedProductOptions,
      newSelectedProductOption,
    ];

    const newTotalQuantity = this.getTotalQuantity(selectedProductOptions);
    this.setState({
      ...this.state,
      quantity: newTotalQuantity,
      selectedProductOptions,
    });
  }

  removeSelectedProductOption(optionId) {
    const newSelectedProductOptions = this.state.selectedProductOptions.filter(
      selectedProductOption => selectedProductOption.optionId !== optionId
    );
    const newTotalQuantity = this.getTotalQuantity(newSelectedProductOptions);
    this.setState({
      ...this.state,
      quantity: newTotalQuantity,
      selectedProductOptions: newSelectedProductOptions,
    });
  }

  getTotalQuantity(newSelectedProductOptions) {
    return newSelectedProductOptions.length <= 0
      ? 1
      : newSelectedProductOptions.reduce(
          (acc, selectedProductOption) => acc + selectedProductOption.quantity,
          0
        );
  }

  setOptionsQuantity(optionId, newQuantity) {
    const maxQuantity = this.props.product.stockCount;
    const minQuantity = 1;
    const quantity =
      newQuantity > maxQuantity
        ? maxQuantity
        : newQuantity < minQuantity
        ? minQuantity
        : newQuantity;
    const newSelectedProductOptions = this.state.selectedProductOptions.map(
      selectedOption => {
        if (optionId === selectedOption.optionId) {
          return { ...selectedOption, quantity };
        }
        return selectedOption;
      }
    );
    const newTotalQuantity = this.getTotalQuantity(newSelectedProductOptions);
    this.setState({
      ...this.state,
      quantity: newTotalQuantity,
      selectedProductOptions: newSelectedProductOptions,
    });
  }

  setTotalQuantity(newQuantity) {
    const maxQuantity = this.props.product.stockCount;
    const minQuantity = 1;
    if (newQuantity > maxQuantity)
      this.setState({ ...this.state, quantity: maxQuantity });
    else if (newQuantity < minQuantity)
      this.setState({ ...this.state, quantity: 1 });
    else this.setState({ ...this.state, quantity: newQuantity });
  }

  getTotalPrice() {
    const product = this.props.product;
    const totalPrice =
      product.price * 0.01 * (100 - product.discountRate) * this.state.quantity;

    const totalAdditionalFee = this.state.selectedProductOptions.reduce(
      (acc, selectedProductOption) => {
        const optionIdx = product.option.findIndex(
          option => option.id === selectedProductOption.optionId
        );
        acc +=
          selectedProductOption.quantity *
          product.option[optionIdx].additionalFee;
        return acc;
      },
      0
    );
    return totalPrice + totalAdditionalFee;
  }

  getProductFromCart() {
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    const productId = this.props.product.id;
    if (!cartItem || !cartItem[productId]) {
      const defaultProduct = {
        id: productId,
        detail: this.props.product,
        option: [],
        totalPrice: 0,
        quantity: 0,
      };
      return defaultProduct;
    }
    return cartItem[productId];
  }

  addProductCart() {
    if (this.state.quantity < 1) return;
    const addedProduct = this.getProductFromCart();
    this.state.selectedProductOptions.forEach(option => {
      const targetIndex = addedProduct.option.findIndex(
        addedOption => addedOption.optionId === option.optionId
      );
      if (targetIndex === -1) {
        addedProduct.option.push(option);
      } else {
        addedProduct.option[targetIndex].quantity += option.quantity;
      }
    });
    addedProduct.quantity += this.state.quantity;
    addedProduct.totalPrice += this.getTotalPrice();
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    const setCartItem = { ...cartItem, [addedProduct.id]: addedProduct };
    localStorage.setItem('cart', JSON.stringify(setCartItem));
  }

  orderProduct() {
    const productId = this.props.product.id;
    const addedProduct = {
      id: productId,
      detail: this.props.product,
      option: [],
      totalPrice: 0,
      quantity: 0,
    };
    this.state.selectedProductOptions.forEach(option => {
      const targetIndex = addedProduct.option.findIndex(
        addedOption => addedOption.optionId === option.optionId
      );
      if (targetIndex === -1) {
        addedProduct.option.push(option);
      } else {
        addedProduct.option[targetIndex].quantity += option.quantity;
      }
    });
    addedProduct.quantity += this.state.quantity;
    addedProduct.totalPrice += this.getTotalPrice();
    const cartItem = JSON.parse(localStorage.getItem('cart'));
    const setCartItem = { [addedProduct.id]: addedProduct };
    localStorage.setItem('cart', JSON.stringify(setCartItem));
  }

  toggleCartModal() {
    this.setState({ ...this.state, cartModal: !this.state.cartModal });
  }

  render() {
    const orderForm = document.createElement('form');
    orderForm.setAttribute('class', 'product-order-form');

    const productOptionContainer = document.createElement('div');
    productOptionContainer.setAttribute('class', 'product-option');

    const deliveryTitle = document.createElement('span');
    deliveryTitle.setAttribute('class', 'delivery-title');
    deliveryTitle.innerText = `택배 배송 / ${
      this.props.product.shippingFee > 0
        ? `${this.props.product.shippingFee.toLocaleString('ko-Kr')}원`
        : '무료 배송'
    }`;

    const selectedProductContainer = document.createElement('div');
    selectedProductContainer.setAttribute('class', 'selected-product');
    if (this.props.product.option.length > 0) {
      const optionSelector = createComponent(OptionSelector, {
        option: this.props.product.option,
        addSelectedProductOption: this.addSelectedProductOption.bind(this),
      });
      const selectedProductOptionList = document.createElement('ul');
      this.state.selectedProductOptions.forEach(selectedProductOption => {
        const selectedOption = this.props.product.option.find(
          option => option.id === selectedProductOption.optionId
        );
        const optionName = selectedOption.optionName;
        const productPrice =
          this.props.product.price *
          (1 - this.props.product.discountRate * 0.01);
        const optionPrice = productPrice + selectedOption.additionalFee;
        const quantityInput = createComponent(QuantityInput, {
          ...this.props,
          quantity: selectedProductOption.quantity,
          setQuantity: this.setOptionsQuantity.bind(
            this,
            selectedProductOption.optionId
          ),
        });
        const selectedProductOptionItem = createComponent(SelectedOption, {
          optionName,
          optionPrice,
          quantityInput,
          removeSelectedProductOption: this.removeSelectedProductOption.bind(
            this,
            selectedProductOption.optionId
          ),
        });
        selectedProductOptionList.append(selectedProductOptionItem);
      });

      selectedProductContainer.append(
        optionSelector,
        selectedProductOptionList
      );
    } else {
      const quantityInput = createComponent(QuantityInput, {
        ...this.props,
        quantity: this.state.quantity,
        setQuantity: this.setTotalQuantity.bind(this),
      });
      selectedProductContainer.append(quantityInput);
    }

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
    productQuantityNum.innerText = this.state.quantity.toLocaleString('ko-Kr');

    productQuantity.append('총 수량', productQuantityNum, '개');

    const totalPrice = document.createElement('strong');
    totalPrice.setAttribute('class', 'price l-price');
    const totalProductPrice = this.getTotalPrice();
    totalPrice.innerText = totalProductPrice.toLocaleString('ko-Kr');

    const priceType = document.createElement('span');
    priceType.innerText = '원';
    totalPrice.append(priceType);

    totalOrderInfo.append(productQuantity, totalPrice);
    totalPriceContainer.append(totalPriceTitle, totalOrderInfo);

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-group');
    const orderButtonProps =
      this.props.product.stockCount < 1
        ? { text: '품절된 상품입니다.', disabled: true }
        : {
            text: '바로 구매',
            disabled: false,
          };
    const orderButton = createComponent(OrderButton, orderButtonProps);
    const cartButton = createComponent(CartButton, orderButtonProps);
    const productLikeButton = createComponent(ProductLikeButton, {
      productId: this.props.product.id,
    });
    buttonContainer.append(orderButton, cartButton, productLikeButton);
    if (this.props.product.stockCount > 0 && this.state.quantity > 0) {
      cartButton.addEventListener('click', this.toggleCartModal.bind(this));
      orderButton.addEventListener('click', () => {
        this.orderProduct();
        window.routing('/cart');
      });
      if (!this.state.cartModal)
        cartButton.addEventListener('click', this.addProductCart.bind(this));
    }

    if (this.state.cartModal) {
      const modalMessage = document.createElement('p');
      modalMessage.innerText = '장바구니에 추가되었습니다.';
      const cartLink = document.createElement('a');
      cartLink.setAttribute('class', 'cart-link');
      cartLink.href = '/cart';
      cartLink.innerText = '장바구니 가기';
      const closeModal = document.createElement('button');
      closeModal.type = 'button';
      closeModal.setAttribute('class', 'close-modal-btn');
      closeModal.innerText = '계속 쇼핑하기';
      closeModal.addEventListener('click', this.toggleCartModal.bind(this));
      const messageModal = createComponent(MessageModal, {
        childrenEl: [modalMessage, cartLink, closeModal],
      });
      buttonContainer.append(messageModal);
    }
    productOptionContainer.append(deliveryTitle, selectedProductContainer);
    if (this.props.product.stockCount < 1) {
      orderForm.append(buttonContainer);
    } else {
      orderForm.append(
        productOptionContainer,
        totalPriceContainer,
        buttonContainer
      );
    }
    return orderForm;
  }
}

export default OrderForm;
