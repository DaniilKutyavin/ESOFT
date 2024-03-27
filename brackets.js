function isValid(s) {
    const stack = [];
    const brackets = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (brackets[char]) {
            stack.push(char); 
        } 
        
        else {
            const lastBracket = stack.pop();
            
            if (char !== brackets[lastBracket]) {
                return false; 
            }
        }
    }
    
    return stack.length === 0; 
}

console.log(isValid("()"));      
console.log(isValid("()[]{}"));  
console.log(isValid("(]"));     
console.log(isValid("([)]"));    
console.log(isValid("{[]}"));   
