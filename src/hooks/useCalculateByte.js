const useCalculateByte = (str) => {
  let byte = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i].charCodeAt() > 128) {
      byte += 3;
    } else {
      byte += 1;
    }
  }

  return byte;
};

export default useCalculateByte;
