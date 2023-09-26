import { Component } from '../../core/index.js';
import { ProductImage, ProductName, ProductPrice } from '../Product/index.js';
import { ProductLikeButton } from '../Button/index.js';

class ProductCard extends Component {
  render() {
    const product = document.createElement('a');
    product.setAttribute('href', `/detail/${this.props.item.id}`);
    product.setAttribute('class', 'product-item');

    const productImage = new ProductImage({
      src: this.props.item.thumbnailImg,
    });
    const productName = new ProductName({ name: this.props.item.productName });
    const productPrice = new ProductPrice({
      price: this.props.item.price,
      discountRate: this.props.item.discountRate,
    });
    const productLikeButton = new ProductLikeButton({
      productId: this.props.item.id,
    });

    product.appendChild(productImage.render());
    product.appendChild(productName.render());
    product.appendChild(productPrice.render());
    product.appendChild(productLikeButton.init());

    return product;
  }
}

export default ProductCard;
