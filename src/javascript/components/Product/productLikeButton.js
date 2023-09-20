import { Component } from '../../core/index.js';

class ProductLikeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: this.checkLikeList(),
    };
  }

  checkLikeList() {
    if (!localStorage.getItem('likeList')) {
      localStorage.setItem('likeList', JSON.stringify([]));
    }
    const likeList = JSON.parse(localStorage.getItem('likeList'));
    return likeList.includes(this.props.productId);
  }

  changeLiked() {
    const likeList = JSON.parse(localStorage.getItem('likeList'));
    const newLikeList = this.checkLikeList()
      ? likeList.filter(id => id !== this.props.productId)
      : [...likeList, this.props.productId];
    localStorage.setItem('likeList', JSON.stringify(newLikeList));
    this.setState({ liked: this.checkLikeList() });
  }

  render() {
    const likeButton = document.createElement('button');
    likeButton.setAttribute('class', 'like-btn');
    this.state.liked && likeButton.classList.add('on');

    const likeButtonIr = document.createElement('span');
    likeButtonIr.setAttribute('class', 'ir');
    likeButtonIr.innerText = '좋아요 버튼';

    likeButton.appendChild(likeButtonIr);

    likeButton.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation(); // 클릭했을 때 url이 이동하지 않도록 하기 위해 버블링 중단하기(이벤트 캡처링과 버블링)
      this.changeLiked();
    });

    return likeButton;
  }
}

export default ProductLikeButton;
