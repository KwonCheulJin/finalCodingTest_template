class ProductPage {
  constructor() {
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
  }
  render() {
    const container = document.createElement('div');
    const element = document.createElement('h1');

    element.innerText = '상품목록 페이지입니다.';

    const anchor1 = document.createElement('a');
    anchor1.href = '/detail/1';
    anchor1.innerText = '1 상세페이지 이동';

    container.appendChild(anchor1);

    const anchor2 = document.createElement('a');
    anchor2.href = '/detail/2';
    anchor2.innerText = '2 상세페이지 이동';

    container.appendChild(anchor2);

    const anchor3 = document.createElement('a');
    anchor3.href = '/detail/3';
    anchor3.innerText = '3 상세페이지 이동';

    container.appendChild(anchor3);

    container.appendChild(element);

    this.setProductList();
    return container;
  }
}

export default ProductPage;
