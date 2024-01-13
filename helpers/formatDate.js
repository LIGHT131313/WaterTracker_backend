function putZeroSec(dateString) {
  const date = new Date(dateString);
  date.setSeconds(0);

  console.log(date.toISOString());
  return date.toISOString();
}

export default putZeroSec;
