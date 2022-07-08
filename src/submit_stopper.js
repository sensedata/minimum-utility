export const submitStopper = (handler) => async (event) =>{
  event.preventDefault();
  event.stopPropagation();
  await handler();
  return false;
};
