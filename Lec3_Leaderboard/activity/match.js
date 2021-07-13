let fs = require('fs');
let request= require('request');
let cheerio = require('cheerio');

let leaderboard =[];
//ek match ki details nikalne ke liye
let count=0;
function getMatch(link)
{
    console.log("Sending request",count);
    request(link,cb);
    count+=1;

}

module.exports = getMatch;



function cb(error,response,html)
{
    if( error == null && response.statusCode == 200)
    {
        count--;
        console.log("Received Data "+ count);
        parseData(html);

        if(count==0)
        {
            console.log(leaderboard.length);
            console.table(leaderboard);
        }
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
                // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} 4s = ${four}  6s = ${six} `)
                //ek batsman ki detail
             
                // processDetails(teamName,batsmanName,runs,balls,four,six);
                createLeaderboard(teamName,batsmanName,runs,balls,four,six);

            }
        }


    }

    // console.log("************************************************");
}


// function leaderboardFileExist()
// {
//     return fs.existsSync("./leaderboard.json");
// }

// function createLeaderboardFile(batsmanName,runs,balls,four,six)
// {
//     fs.mkdirSync("leaderboard.json");
//     let leaderboard=[];
//     let innings ={
//         BatsmanName : batsmanName,
//         Runs : runs,
//         Balls : balls,
//         Fours : four,
//         Sixes : six 
//     }
    
//     leaderboard.push(innings);
//     leaderboard = JSON.stringify(leaderboard);


// }

// function updateLeaderBoardFile(batsmanName,runs,balls,four,six)
// {

//     let leaderboard = fs.readFileSync("leaderboard.json");
//     leaderboard= JSON.parse(leaderboard);
    

//     let data=[];

//     for(let i=0; i<leaderboard.length; i++)
//     {
//         let batsmanData = leaderboard[i];
//         if(leaderboard[i].BatsmanName == batsmanName)
//         {

//             batsmanData.Runs+=runs;
//             batsmanData.Balls+=balls;
//             batsmanData.Fours+=four;
//             batsmanData.Sixes+=six;
//             data.push(batsmanData);
//             return;
//         }
        
//     }

//     //batsman Data does not exit , so we create it for the first time
//     data.push({
//         BatsmanName : batsmanName,
//         Runs : runs,
//         Balls : balls,
//         Fours : four,
//         Sixes : six 

//     });


//     data = JSON.stringify(data);
//     fs.writeFileSync("leaderboard.json",data);

    

// }

function createLeaderboard(teamName,batsmanName,runs,balls,fours,sixes)
{
    

    runs = Number(runs);
    balls = Number(balls);
    fours= Number(fours);
    sixes = Number(sixes);


    for(let i=0; i<leaderboard.length; i++)
    {
        if(leaderboard[i].Batsman == batsmanName 
            && leaderboard[i].Team==teamName)
            {
                leaderboard[i].Runs+=runs;
                leaderboard[i].Balls+=balls;
                leaderboard[i].Fours+=fours;
                leaderboard[i].Sixes+=sixes;
                return;
            }

    }


    let entry={
        Team : teamName,
        Batsman : batsmanName,
        Balls : balls,
        Runs : runs,
        Fours : fours,
        Sixes : sixes
    }
    leaderboard.push(entry);
}



