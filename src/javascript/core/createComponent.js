const createComponent = (Component, props) => {
  const component = new Component(props);
  return component.init();
};

export default createComponent;
