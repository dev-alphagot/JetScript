module.exports.run = async (code) => {
    //console.log("Startd!");
    try{
    let excute_before = code;
    let codelet = code.length;
    let code_prograss = 0;
    let virtual_memory = [];

    while(code_prograss < codelet){
        let excute = excute_before[code_prograss].replace("\n","").split("  ");
        switch(excute[0]){
            case "fnc":
                //console.log("fnc call");
                virtual_memory[`${excute[1]}`] = "";
                code_prograss++;
                break;
            
            case "ioout":
                //console.log("ioout call");
                let fnc_print_data = virtual_memory[`${excute[1]}`];
                console.log(fnc_print_data);
                delete fnc_print_data;
                code_prograss++;
                break;
            
            case "ioin":
                code_prograss++;
                break;
            
            case "compute":
                //console.log("compute call");
                let compute_data = virtual_memory[`${excute[1]}`];
                let compute_result = eval(compute_data);
                virtual_memory[`${excute[1]}`] = compute_result;
                code_prograss++;
                delete compute_data;
                delete compute_result;
                break;

            case "delete":
                code_prograss++;
                break;

            default:
                if(excute[1]){
                    if(excute[1] == "<-"){
                        virtual_memory[`${excute[0]}`] = excute[2];
                    } else if (excute[1] == "<="){
                        virtual_memory[`${excute[0]}`] = virtual_memory[`${excute[2]}`];
                    }
                }
                code_prograss++;
                break;
        }
        //console.log(`line: ${code_prograss}`);
        //console.log(`data: ${virtual_memory}`);
    }
    } catch(e){
        console.log("an unexpected error has occurred. exiting...");
        console.log(`=== ERR LOG ===\n\n${e}`);
    }
}