import { Component, createComponent } from '../core/index.js';
import {
  ProductBasicInfo,
  ProductDetailInfo,
} from '../components/ProductDetail/index.js';
import { CloseButton } from '../components/Button/index.js';
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoading: false,
    };

    this.getProductData();
  }

  // 전체 상품 정보 가져오기
  async getProductData() {
    const response = await fetch(
      `https://test.api.weniv.co.kr/mall/${this.props.id}`
    );
    const data = await response.json();

    this.setState({ product: data, isLoading: true });
  }

  render() {
    const container = document.createElement('article');
    container.setAttribute('class', 'product-detail');

    const heading = document.createElement('h1');
    heading.setAttribute('class', 'ir');
    heading.innerText = '상품 상세 정보 페이지';

    const contentWrap = document.createElement('div');
    contentWrap.setAttribute('class', 'content-wrap');
    if (this.state.isLoading) {
      // 기본정보
      const productBasicInfo = createComponent(ProductBasicInfo, {
        product: this.state.product,
      });
      // 상세정보
      const productDetailInfo = createComponent(ProductDetailInfo, {
        product: this.state.product,
      });
      contentWrap.append(productBasicInfo, productDetailInfo);
    }
    // 닫기버튼
    const closeButton = createComponent(CloseButton);
    closeButton.addEventListener('click', () => window.history.back());
    contentWrap.append(closeButton);

    container.append(contentWrap);
    return container;
  }
}

export default ProductDetail;
