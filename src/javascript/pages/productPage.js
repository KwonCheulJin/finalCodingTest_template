import { ProductCard } from '../components/ProductCard/index.js';

class ProductPage {
  constructor() {
    this.mainElement = document.createElement('main');
    this.product = {};
  }

  // 전체 상품 정보 가져오기
  async getProductData() {
    const response = await fetch('https://test.api.weniv.co.kr/mall');
    const data = await response.json();

    this.product = await data;
  }
  // 상품 리스트 세팅하기
  async setProductList() {
    await this.getProductData();

    console.log(this.product);

    this.mainElement.classList.add('product');
    const productPageHeader = document.createElement('h1');
    productPageHeader.setAttribute('class', 'ir');
    productPageHeader.innerText = '상품 목록 페이지';

    this.mainElement.appendChild(productPageHeader);

    const productList = document.createElement('ul');
    productList.setAttribute('class', 'product-list');

    this.product.forEach(item => {
      const productItem = document.createElement('li');
      productItem.setAttribute('class', 'product-item');
      const productCard = new ProductCard({ item });
      productItem.append(productCard.render());
      productList.append(productItem);
    });

    this.mainElement.appendChild(productList);
  }
  render() {
    this.setProductList();
    return this.mainElement;
  }
}

export default ProductPage;
