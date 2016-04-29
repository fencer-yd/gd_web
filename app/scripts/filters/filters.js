'use strict';

/**
 * @ngdoc filter
 * @name customFormApp.filter:filters
 * @function
 * @description
 * # filters
 * Filter in the customFormApp.
 */
(function(){

	/**
	 * 数字转字母
	 */
	var numToLetter = function(){
		return function (index) {
			return [
				'A', 'B', 'C', 'D',
				'E', 'F', 'G', 'H',
				'I', 'J', 'K', 'L',
				'M', 'N', 'O', 'P',
				'Q', 'R', 'S', 'T',
				'U', 'V', 'W', 'X',
				'Y', 'Z'
			][index]
		};
	};

	/**
	 * 数字转中文数字
	 */
	var numToCharacter = function(){
		return function (num) {
			var base = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
			var numChar = num.toString();
			if (num < 10) {
				return base[num]
			} else if (num == 10) {
				return base[0]
			} else if (num < 20) {
				return base[0] + base[numChar[1]]
			} else {
				return base[numChar[0]] + '十' + (numChar[1] == '0' ? '' : base[numChar[1]])
			}
		};
	};

	/**
	 * key value 转换
	 */
	var keyValueTrans = function(){
		return function (key, types) {
			var res = '';
			angular.forEach(types, function (item) {
				if (item.key == key) {
					res = item.value
				}
			});
			return res;
		}
	};

	var pyFilter = function(){
		return function (data, str, obj) {
			var res = [];
			if (str) {
				var regexp = new RegExp(str.toLowerCase(), 'ig');
				angular.forEach(data, function (item) {
					var pinyin = Pronunciation.getFullChars(item[obj]),
						pinyinShort = Pronunciation.getCamelChars(item[obj]);
					if (regexp.test(pinyin) || regexp.test(pinyinShort) || regexp.test(item[obj])) {
						res.push(item)
					}
				});
			} else {
				res = data
			}
			return res;
		}
	};

	numToLetter.$inject = [];
	numToCharacter.$inject = [];
	keyValueTrans.$inject = [];
	pyFilter.$inject = [];

	angular.module('filterApp',[])
		.filter('numToLetter',numToLetter)
		.filter('numToCharacter',numToCharacter)
		.filter('keyValueTrans',keyValueTrans)
		.filter('pyFilter',pyFilter);
})();