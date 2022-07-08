export const changeHandler = (setStateItem, stateItem) => (event) => {
  setStateItem({...stateItem, [event.target.name]: event.target.value });
};
