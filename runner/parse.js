module.exports.parse = async (code) => {
    let cut_let;
    let synconfig = require('./config.json').useoldsyntax;
    if(synconfig) {
        cut_let = "  ";
    } else {
        cut_let = ";;";
    }
    
    try{
        let cuted = code.split(cut_let);
        //console.log(cuted);
        let exec = require('./exec.js');

        for(let i = 0; i < cuted.length; i++){
            cuted[i].replace("/\n/gi", "  ");
        }

        //console.log(cuted);
        exec.run(cuted);

    } catch(e){
        console.log("an unexpected error has occurred. exiting...");
        console.log(`=== ERR LOG ===\n\n${e}`);
    }
}