const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const todayDate = `${day}-${month}-${year}`;
  return todayDate;
};
export default getDate;
