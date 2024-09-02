export const debounce = (
  callback: (...args: any[]) => void,
  wait: number = 500,
) => {
  let timeoutId: Timer;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
