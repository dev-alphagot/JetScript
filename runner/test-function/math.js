module.exports.math = async (math_code) => {
    let cut_math_code = math_code.split(" ");
    let math_final;

    for(let i; i < cut_math_code.length; i++){
        switch(cut_math_code[i]){
            case "+":
                let sum_front = cut_math_code[i - 1];
                let sum_back = cut_math_code[i + 1];
                let sum_result = sum_front + sum_back;
                math_final += sum_result;
                break;


        }
    }

    return math_final;
}