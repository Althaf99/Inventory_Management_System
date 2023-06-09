export default function generateColor(value) {
  const hashCode = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash) + 22222;
    }
    return hash;
  };

  const intToHEX = (i) => {
    var c = "#" + (i & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  };

  return intToHEX(hashCode(value));
}
