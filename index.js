const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const terminalImage = require('terminal-image')
// const param = qs.stringify({
//     'grant_type': 'client_credentials',
//     'client_id': 'bwv7vU6jcGbmCdRRGZ75bsKo',
//     'client_secret': '6i8lEPKyWdY4tyXZK0h5WrsOnRBPDxoo'
// });
// 24.1f982ca52649cce69bbc1cadecf6628d.2592000.1555510648.282335-15747705
// https.get(
//     {
//         hostname: 'aip.baidubce.com',
//         path: '/oauth/2.0/token?' + param,
//         agent: false
//     },
//     function (res) {        
//         res.pipe(process.stdout);
//     }
// );

superagent.get('https://github.com/Alvin9999/new-pac/wiki/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7')
    .end(async function (err, res, next) {
        if (err) {
            next(err);
        }
        var $ = cheerio.load(res.text);
        const target = $('.markdown-body>p>img')['0'].attribs.src;
        const filename = target.split('/').pop();
        // console.log(target);
        // save image to local
        superagent
            .get(target)
            .pipe(fs.createWriteStream(filename))
            .on('close', async () => {            
                console.log(await terminalImage.file(filename));            
            })
    });