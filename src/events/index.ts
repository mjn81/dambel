export const createResetMapEvent = () => {
  const key = 'reset-map';
  const event = new CustomEvent(key);
  return {
    key,
    event,
  };
}