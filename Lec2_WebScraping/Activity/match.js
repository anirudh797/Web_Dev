let fs = require('fs');
let request= require('request');
let cheerio = require('cheerio');

//ek match ki details nikalne ke liye

function getMatch(link)
{
    request(link,cb);
}

module.exports = getMatch;


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
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");


    for(let i=0; i<bothInnings.length-1; i++)
    {
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        // console.log(teamName);

        let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");
        for(let j=0 ; j<allTrs.length; j++)
        {
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length >1)
            {
             
                let batsmanName = ch(allTds[0]).find("a").text().trim();
                let runs =ch(allTds[2]).text().trim();
                let balls = ch(allTds[3]).text().trim();
                let  four = ch(allTds[5]).text().trim();
                let six = ch(allTds[6]).text().trim();

                //string interpolation
                console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} 4s = ${four}  6s = ${six} `)

            }
        }


    }

    console.log("************************************************");
}