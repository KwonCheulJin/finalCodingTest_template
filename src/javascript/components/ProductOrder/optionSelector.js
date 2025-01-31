import { Component } from '../../core/index.js';

class OptionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listShow: false,
    };
  }

  onClickSelectButton() {
    const listShowState = !this.state.listShow;
    this.setState({ listShow: listShowState });
  }
  render() {
    const optionSelectContainer = document.createElement('div');
    optionSelectContainer.setAttribute('class', 'selectbox');

    const optionButton = document.createElement('button');
    optionButton.setAttribute('class', 'option-btn');
    optionButton.type = 'button';
    optionButton.innerText = '옵션을 선택하세요';
    optionButton.addEventListener('click', this.onClickSelectButton.bind(this));

    const optionList = document.createElement('ul');

    optionList.setAttribute('class', `${this.state.listShow ? 'on' : ''}`);
    this.props.option.forEach(option => {
      const optionItem = document.createElement('li');
      const additionalFeeText =
        option.additionalFee > 0
          ? `+(${option.additionalFee.toLocaleString('ko-Kr')}원)`
          : '';
      optionItem.innerText = `${option.optionName} ${additionalFeeText}`;
      optionItem.addEventListener('click', () => {
        this.onClickSelectButton();
        this.props.addSelectedProductOption(option.id);
      });
      optionList.append(optionItem);
    });

    optionSelectContainer.append(optionButton, optionList);

    return optionSelectContainer;
  }
}

export default OptionSelector;
