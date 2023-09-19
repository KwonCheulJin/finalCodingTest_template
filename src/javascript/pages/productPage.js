import { ProductItem } from '../components/Product/index.js';

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
    this.mainElement.innerHTML = `
      <h1 class="ir">상품 목록 페이지</h1>
      <ul class="product-list"></ul>
    `;

    const productList = this.mainElement.querySelector('.product-list');

    this.product.forEach(item => {
      const productItem = new ProductItem(item);
      productList.append(productItem.render());
    });
    console.log(
      '🚀 ~ file: productPage.js:21 ~ ProductPage ~ setProductList ~ this.mainElement:',
      this.mainElement
    );
  }
  render() {
    this.setProductList();
    return this.mainElement;
  }
}

export default ProductPage;
