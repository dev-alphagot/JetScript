module.exports.run = async (code) => {
    //console.log("Startd!");
    try{
    let excute = code;
    let codelet = code.length;
    let code_prograss = 0;
    let virtual_memory = [];

    while(code_prograss < codelet){
        switch(excute[code_prograss]){
            case "fnc":
                virtual_memory[`${excute[code_prograss + 1]}`] = "";
                code_prograss++;
                code_prograss++;
                break;
            
            case "<-":
                let target_func_1 = excute[code_prograss - 1];
                let push_object = excute[code_prograss + 1];
                virtual_memory[target_func_1] += push_object;
                code_prograss++;
                delete push_object;
                delete target_func_1;
                break;
            
            case "ioout":
                let printmsg = virtual_memory[`${excute[code_prograss + 1]}`];
                //printmsg.replace("undefined", " ");
                console.log(printmsg);
                code_prograss++;
                delete printmsg;
                break;
            
            case "ioin":
                var linereader = require('readline-sync');
                var input_data = linereader.question("Input>");
                virtual_memory[`${excute[code_prograss + 1]}`] += input_data;
                code_prograss++;
                delete linereader;
                delete input_data;
                break;
            
            case "compute":
                let compute_data = virtual_memory[`${excute[code_prograss + 1]}`];
                let compute_result = eval(compute_data);
                virtual_memory[`${excute[code_prograss + 1]}`] = compute_result;
                console.log(`Computed: ${compute_result}`);
                code_prograss++;
                delete compute_result;
                delete compute_data;
                break;

            case "delete":
                virtual_memory[`${excute[code_prograss + 1]}`] = "";
                break;

            default:
                code_prograss++;
        }
        //console.log(code_prograss);
        //console.log(virtual_memory);
    }
    } catch(e){
        console.log("an unexpected error has occurred. exiting...");
        console.log(`=== ERR LOG ===\n\n${e}`);
    }
}