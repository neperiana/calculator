const operator_map = {
    '✕': (x, y)=>x*y,
    '÷': (x, y)=>x/y,
    '+': (x, y)=>x+y,
    '-': (x, y)=>x-y,
}

function resolve_formula_rec(formula){
    // base
    if (/^\s*\-*[0-9]+\.*[0-9]*\s*$/.test(formula)) {
        return 1.0*formula;
    
    } else if (/\(/.test(formula)) {
    // deals with parentesis
        // find splits
        let start = formula.indexOf('(');
        let end = formula.indexOf(')');
        if (end === -1) return null;
        
        // split into 3
        let split_1 = formula.substring(0, start);
        let split_2 = formula.substring(start + 1, end);
        let split_3 = formula.length-1 < end ? formula.substring(end) : '';

        // recursion
        let no_parentesis_formula =  split_1 + resolve_formula_rec(split_2) + split_3;
        return resolve_formula_rec(no_parentesis_formula);

    } else if (/[+|-]/.test(formula)) {
        console.log('found a negative:', formula);
    // multiplication and division
        // find split
        let mid = /[+|-]/.exec(formula)['index'];
        // check operator is not beggining or end
        if (formula.length-1 === mid) {
            return null;
        } else if (mid===0 || ['✕','÷','+','-'].includes(formula[mid-1])) {
            
        } else {
            let part_1 = resolve_formula_rec(formula.substring(0, mid));
            let part_2 = resolve_formula_rec(formula.substring(mid+1));
            console.log(part_1,formula[mid],part_2);
            // find operator and recurse
            let operator = operator_map[formula[mid]];
            return operator(part_1, part_2);
        }

    } else if (/[+|-]/.test(formula)) {
        console.log('found an addition:', formula);
    // multiplication and division
        // find split
        let mid = /[+|-]/.exec(formula)['index'];
        console.log('in ', mid);
        // check operator is not beggining or end
        if (formula.length-1 === mid){
            return null;
        } else if (mid === 0) {
            console.log('adding a zero:', '0' + formula);
            return resolve_formula_rec('0' + formula);
        } else {
            let part_1 = resolve_formula_rec(formula.substring(0, mid));
            let part_2 = resolve_formula_rec(formula.substring(mid+1));
            console.log(part_1,formula[mid],part_2);
            // find operator and recurse
            let operator = operator_map[formula[mid]];
            return operator(part_1, part_2);
        }

    } else if (/[✕|÷]/.test(formula)) {
    // multiplication and division
        // find split
        let mid = /[✕|÷]/.exec(formula)['index'];
        // check operator is not beggining or end
        if (formula.length-1 === mid || mid===0) return null;
        // find operator and recurse
        let operator = operator_map[formula[mid]];
        let part_1 = resolve_formula_rec(formula.substring(0, mid));
        let part_2 = resolve_formula_rec(formula.substring(mid+1));
        return operator(part_1, part_2);

    };
}

function resolve_formula(formula) {
    console.log('formula to resolve:', formula);
    let clean_formula = formula.trim();
    console.log('clean formula:', clean_formula);
    let num_result = resolve_formula_rec(clean_formula);
    return num_result == null ? 'error' : num_result.toFixed(2);
}

export default resolve_formula;