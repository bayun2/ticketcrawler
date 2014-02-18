var cf = require("./car");
var fs =require('fs');
var path = require('path');
var version = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')).version;

var cartypes = ['小型汽车', '大型汽车', '使馆汽车', 
	'领馆汽车', '境外汽车', '外籍汽车', '普通摩托车', '轻便摩托车', 
	'使馆摩托车', '领馆摩托车', '境外摩托车', '外籍摩托车', '低速车', '拖拉机', 
	'挂车', '教练汽车', '教练摩托车', '试验汽车', '试验摩托车', '临时入境汽车', 
	'临时入境摩托车', '临时行驶车', '警用汽车', '警用摩托'];

var cartypeInfo = "";
cartypes.forEach(function(ele, idx, arr) {
	cartypeInfo += idx + " " + ele + " ";
})

var program = require('commander')
	.version(version || '0.0.1')
	.usage('[option]')
	.option('-t, --car-type [n]', '号牌种类: \n\n' + cartypeInfo + '\n', '0')
	.option('-n, --car-number [value]', '号牌号码')
	.option('-i --inumber [n]', '车辆识别代号')
	.parse(process.argv)



/*if (program.carType) {
	console.log(cartypes[program.carType]);
} 
if (program.carNumber){
	console.log("hah")
}
if (program.inumber){
	console.log("hah")
}*/
console.log("0")
if (program.carType && program.carNumber && program.inumber) {
	console.log("1")
	cf.fire(program.carType, program.carNumber, program.inumber);
}
//$('[name=ctl00$ContentPlaceHolder1$hpzl]').val(ctl00$ContentPlaceHolder1$hpzl[argv.t])
//$('[name=ctl00$ContentPlaceHolder1$steelno]').val(argv.n);
//$('[name=ctl00$ContentPlaceHolder1$identificationcode]').val(argv.i)

