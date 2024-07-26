const store = (function () {
  let state = {
    counter: 0,
  };

  function setState(newState) {
    state = { ...state, ...newState };
  }

  function getState() {
    return state;
  }

  return {
    setState,
    getState,
  };
})();

export function increment() {
  store.setState({ counter: store.getState().counter + 1 });
}

export function decrement() {
  store.setState({ counter: store.getState().counter - 1 });
}

export default store;
