// 提交车辆查询
var phantom = require('phantom');
var async   = require('async');
var iRequest = require('request');
var mongoose = require('mongoose');
var fs       = require('fs');
var ocrad       = require('./ocrad');

function fire(carType, carNumber, inumber) {
	// 设置request 修改默认 userAgent
	var defaultsOptions = {
		headers : {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36'
		}
	}
	var iRequestObj = iRequest.defaults(defaultsOptions);
	async.waterfall([
			function(callback) {
				phantom.create("--web-security=no", "--ignore-ssl-errors=yes", 
					{port:12345}, function(ph) {
						console.log("phantom bridge initiated");
						callback(null, ph);
					})
			},
			function(ph, callback) {
				ph.createPage(function(page) {
					console.log("page created");
					callback(null, page);
				})
			},
			function(page, callback) {
				page.onConsoleMessage = function (msg) {
				    console.log(msg);
				};
				page.onError = function (msg) {
				    console.log(msg);
				    phantom.exit();
				}
				page.open('http://www.hzti.com/service/qry/veh_info.aspx?type=2&node=157', function(status) {
					if (status == 'success') {
						page.render('./sss.png');
						page.evaluate(
							function() {
								var img = document.getElementById('chkcode');
							    var iwidth = 80,
							        iheight = 30;
							    var canvas = document.createElement('canvas');
							    canvas.width = iwidth;
							    canvas.height = iheight;
							    document.body.appendChild(canvas)
							    var ctx = canvas.getContext("2d");							    
							    // console.log(img)                               
							    ctx.drawImage(img, 0,0);
							    var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
								return imgData;

							},
							function(imgData) {
								//console.log(imgData);
								console.log('********;lo*******');
								//var string = OCRAD(imgData);
								 var string = ocrad.fire(imgData);
								 console.log("ok");
								console.log(string);
							}
						)
						/*page.evaluate(
							function(carType, carNumber, inumber) {
								return carType+carNumber+inumber
								var img = document.getElementById('chkcode');
							    var iwidth = 80,
							        iheight = 30;
							    var canvas = document.createElement('canvas');
							    canvas.width = iwidth;
							    canvas.height = iheight;

							    document.body.appendChild(canvas)
							    var ctx = canvas.getContext("2d");

							    
							    // console.log(img)                               
							    ctx.drawImage(img, 0,0);
							    var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
							    // console.log(imgData)

							    var string = OCRAD(imgData);
							    // console.log(string)
								return string

							},
							function(result) {
								console.log(result);
							}, carType, carNumber, inumber
						)*/
					}
				})
			}
		],
		function(err, result) {
			if (err) {
				console.log(err);
				throw err;
			}
			phantom.exit();
		}
	)
}

exports.fire = fire;