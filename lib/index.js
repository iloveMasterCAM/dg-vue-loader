const pinyin = require("node-pinyin");
function py(key) {
	let name = pinyin(key, {
		style: "toneWithNumber",
	})
		.map((el) => {
			return el[0].toUpperCase();
		})
		.join("_");
	return name;
}
module.exports = function (source) {
	let newHtml = source.replace(/\$t\(["|'][\u4e00-\u9fa5]+\.[\u4e00-\u9fa5]+["|']\)/gi, function (word) {
		let arrStr = word.split(".");
		arrStr.forEach(function (el, i) {
			arrStr[i] = el.replace(/[\u4e00-\u9fa5]+/, function (word) {
				return py(word);
			});
		});
		return arrStr.join(".");
	});

	return newHtml;
};



