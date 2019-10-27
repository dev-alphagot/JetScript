const fs = require('fs');

run();

async function run(code){
    let step1 = require('./runner/parse.js');
    let target_file = process.argv[2];
    let src;

    if(!target_file.endsWith(".jts")){
        console.log("file not exist or corrupt file! exiting...");
        process.exit(2);
    } 

    try {
        let src_raw = fs.readFileSync(process.argv[2], "utf-8");
        src = src_raw;
    } catch(e){
        console.log("an unexpected error has occurred. exiting...");
        console.log(`=== ERR LOG ===\n\n${e}`);
    }

    try {
        step1.parse(src);
    } catch(e){
        console.log("an unexpected error has occurred. exiting...");
        console.log(`=== ERR LOG ===\n\n${e}`);
    }
}