const useTransformDateForm = (date) => {
  const year = date.getFullYear();
  let month = 0;
  let day = 0;

  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = date.getMonth() + 1;
  }

  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  } else {
    day = date.getDate();
  }

  return `${year}-${month}-${day}`;
};

export default useTransformDateForm;
