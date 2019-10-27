module.exports.parse = async (code) => {
    try{
        let cuted = code.split("  ");
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