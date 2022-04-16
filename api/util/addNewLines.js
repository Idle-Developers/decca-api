module.exports = async (str, amount) => {

  var result = '';
  while (str.length > 0) {
    result += str.substring(0, amount) + '\n';
    str = str.substring(amount);
  }
  return result;

}