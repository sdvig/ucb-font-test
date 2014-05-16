var parse = require('css-parse');

var fs = require('fs');
var read = fs.readFileSync;

// CSS input string
var css = read('../AU-style.css', 'utf8');

var output_obj = parse(css);

// Position and Source parameters
var output_obj_pos = parse(css, { position: true, source: '../AU-style.css' });

var json = parse(css);

var result = JSON.stringify(json, null, 2);

var http = require('http');
  http.createServer(function (req, res) {

  var html = '<!DOCTYPE html>' +
             '<html>' +
  '<head>' +
  '<title>Food Delivery and Takeaway Delivery with Delivery Hero</title>' +
  '<link rel="icon" href="http://static.deliveryhero.com.au/assets/coredesign/favicon.ico">' +
  '<style>' +
  '@font-face {'+
    'font-family: "icon-font";'+
    'src: url(http://static.deliveryhero.com.au/assets/coredesign/fonts/icon-font/DHiconset.eot);'+
    'src: url(http://static.deliveryhero.com.au/assets/coredesign/fonts/icon-font/DHiconset.eot?iefix) format("eot"), url(http://static.deliveryhero.com.au/assets/coredesign/fonts/icon-font/DHiconset.woff) format("woff"); }'+
    'span { display: block; margin: 1em; font-size: 2.5em; }'+
    'span:before { margin-right: 1em; }'+
  '</style>'+
  '<link href="http://static.deliveryhero.com.au/assets/AU-style.css" rel="stylesheet">' +
  '<meta charset="utf-8">'+
  '<body class="home">';

  res.write(html);

  json.stylesheet.rules.forEach(function(rule){

    var selectors = rule.selectors;

    if (typeof selectors !== 'undefined' ) {

      var regex = /^\.icon.*:before/;
      var result = selectors[0].match(regex);

      if (result!==null) {

        var className = selectors[0].split(":")[0].substring(1);
        res.write('<span class="'+className+'">.'+className+'</span>');
      }
    }
  });

  res.end('</body></html>');
}).listen(1337);
