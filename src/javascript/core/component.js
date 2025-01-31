class Component {
  constructor(props) {
    this.props = props;
  }

  setState(newState) {
    this.state = newState;
    this.updater();
  }

  updater() {
    const rendered = this.render();
    this.lastRendered?.replaceWith(rendered);
    this.lastRendered = rendered;
  }

  render() {
    // throw new Error('render가 비어있습니다.')
  }

  init() {
    const rendered = this.render();
    this.lastRendered = rendered;

    return rendered;
  }
}

export default Component;
