module.exports.run = async (code) => {
    //console.log("Startd!");
    let exitstat = init(code);
    shutdown(exitstat);
}

async function init(code){
    let execute_before = code;
    let codelet = code.length;
    let code_prograss = 0;
    let virtual_memory = [];
    let k = start(code_prograss, codelet, virtual_memory, execute_before);
    virtual_memory['ioout_buf'] = "";
    return k;
}

async function shutdown(exit_stat){
    process.exit(exit_stat);
}

async function start(code_prograss, codelet, virtual_memory, execute_before) {
    try{
        while(code_prograss < codelet){
            let execute = execute_before[code_prograss].replace("\n","").split("  ");
            switch(execute[0]){
                case "fnc":
                    //console.log("fnc call");
                    virtual_memory[`${execute[1]}`] = "";
                    code_prograss++;
                    break;
                
                case "ioout":
                    //console.log("ioout call");
                    let fnc_print_data = virtual_memory['ioout_buf'];
                    console.log(fnc_print_data);
                    delete fnc_print_data;
                    code_prograss++;
                    break;
                
                case "ioin":
                    code_prograss++;
                    break;
                
                case "compute":
                    //console.log("compute call");
                    let compute_data = virtual_memory[`${execute[1]}`];
                    let compute_result = eval(compute_data);
                    virtual_memory[`${execute[1]}`] = compute_result;
                    code_prograss++;
                    delete compute_data;
                    delete compute_result;
                    break;
    
                case "delete":
                    virtual_memory[`${execute[1]}`] = "";
                    code_prograss++;
                    break;
    
                case "jump":
                    code_prograss = execute[1];
                    break;
    
                case "end":
                    code_prograss = codelet;
                    shutdown(0);
                    break;

                case "math_test":
                    let math_test = require('./test-function/math.js');
                    let k = math_test.math("1 + 2");
                    console.log(k);
                    break;

                case "if":
                    let match_data = virtual_memory[`${execute[1]}`];
                    let match_data_2 = virtual_memory[`${execute[2]}`];
                    let kl
                    for(let k = 3; k < execute.length; k++){
                        kl += execute[k];
                    }
                    if(match_data == match_data_2){
                        start(0, 1, virtual_memory, kl);
                    }
                    code_prograss++;
                    delete match_data;
                    delete match_data_2;
                    delete kl;
                    break;

                case "while":
                    let match_data1 = virtual_memory[`${execute[1]}`];
                    let match_data_21 = virtual_memory[`${execute[2]}`];
                    let endline = execute[3];
                    let kl1;
                    let x = true;
                    kl1 += execute_before[codelet + 1];
                    for(let v = codelet + 2; v == endline; v++){
                        kl1 += execute_before[v];
                    }
                    while(x){
                        start(0, 1, virtual_memory, kl);
                        if(match_data1 == match_data_21){
                            x = false;
                        }
                    }
                    delete match_data1;
                    delete match_data_21;
                    delete kl;
                    break;

                default:
                    if(execute[1]){
                        if(execute[1] == "<-"){
                            virtual_memory[`${execute[0]}`] = execute[2];
                        } else if(execute[1] == "<="){
                            virtual_memory[`${execute[0]}`] = virtual_memory[`${execute[2]}`];
                        } else if(execute[1] == "<=+"){
                            virtual_memory[`${execute[0]}`] += execute[2];
                        } else if(execute[1] == "++"){
                            virtual_memory[`${execute[0]}`]++;
                        } else if(execute[1] == "--"){
                            virtual_memory[`${execute[0]}`]--;
                        }
                    }
                    code_prograss++;
                    break;
            }
            //console.log(`line: ${code_prograss}`);
            //console.log(`data: ${virtual_memory}`);
        }
        shutdown(0); 
        } catch(e){
            console.log("an unexpected error has occurred. exiting...");
            console.log(`=== ERR LOG ===\n\n${e}`);
        }
}