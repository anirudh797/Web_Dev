let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");


function getAllMatches(link)
{
request("https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results",cb);

}

module.exports = getAllMatches;


function cb(error,response,html)
{

    if( error == null && response.statusCode == 200)
    {
        parseData(html);
    }

    else if(response.statusCode == 404)
    {
        console.log("Page not found");
    }

    else{
        console.log(error);
    }

}
function parseData(html)
{
    let ch = cheerio.load(html);


    let allATags = ch('a[data-hover="Scorecard"]');
    // console.log(allATags.length);

    for(let i=0; i<allATags.length; i++)
    {
        let link =ch(allATags[i]).attr("href");
    let complete = "https://www.espncricinfo.com"+link;
        
        
        console.log(complete);

    }

}

