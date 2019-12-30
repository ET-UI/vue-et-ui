/**
 * 用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。
 * @param targetLength 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
 * @param padString 可选，填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。
 * @returns {string}
 *
 * @url https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
 */
String.prototype.padStart = function padStart(targetLength, padString) {
  targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
  padString = String((typeof padString !== 'undefined' ? padString : ' '));
  if (this.length > targetLength) {
    return String(this);
  } else {
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(this);
  }
};

/**
 * 日期时间格式化
 * @param  {[type]} date      [description]
 * @param  {[type]} formatStr [description]
 * @return {[type]}           [description]
 */
export function formatDate(date, formatStr) {
  let that = new Date(date)
  let str = formatStr;
  let Week = ['日', '一', '二', '三', '四', '五', '六'];
  str = str.replace(/yyyy|YYYY/, that.getFullYear());
  str = str.replace(/yy|YY/, (that.getYear() % 100) > 9 ? (that.getYear() % 100).toString() : '0' + (that.getYear() % 100));
  let month = that.getMonth() + 1;
  str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
  str = str.replace(/M/g, month);

  str = str.replace(/w|W/g, Week[that.getDay()]);

  str = str.replace(/dd|DD/, that.getDate() > 9 ? that.getDate().toString() : '0' + that.getDate());
  str = str.replace(/d|D/g, that.getDate());

  str = str.replace(/hh|HH/, that.getHours() > 9 ? that.getHours().toString() : '0' + that.getHours());
  str = str.replace(/h|H/g, that.getHours());
  str = str.replace(/mm/, that.getMinutes() > 9 ? that.getMinutes().toString() : '0' + that.getMinutes());
  str = str.replace(/m/g, that.getMinutes());

  str = str.replace(/ss|SS/, that.getSeconds() > 9 ? that.getSeconds().toString() : '0' + that.getSeconds());
  str = str.replace(/s|S/g, that.getSeconds());
  return str;
}