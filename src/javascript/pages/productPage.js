import { LinkToCart } from '../components/Button/index.js';
import { ProductCard } from '../components/ProductCard/index.js';
import { Component, createComponent } from '../core/index.js';

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.getProductData();
  }

  // 전체 상품 정보 가져오기
  async getProductData() {
    const response = await fetch('https://test.api.weniv.co.kr/mall');
    const data = await response.json();

    this.setState({ products: data });
  }

  render() {
    this.mainElement = document.createElement('main');
    this.mainElement.classList.add('product');
    const productPageHeader = document.createElement('h1');
    productPageHeader.setAttribute('class', 'ir');
    productPageHeader.innerText = '상품 목록 페이지';

    this.mainElement.append(productPageHeader);

    const productList = document.createElement('ul');
    productList.setAttribute('class', 'product-list');

    this.state.products.forEach(item => {
      const productItem = document.createElement('li');
      productItem.setAttribute(
        'class',
        `product-item ${item.stockCount < 1 ? 'sold-out' : ''}`
      );
      const productCard = new ProductCard({ item });
      productItem.append(productCard.render());
      productList.append(productItem);
    });

    const linkToCart = createComponent(LinkToCart, {});
    this.mainElement.append(productList, linkToCart);
    return this.mainElement;
  }
}

export default ProductPage;
