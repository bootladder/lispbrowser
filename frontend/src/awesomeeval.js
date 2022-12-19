

const functable = {
    concat: (args) => { return args.join("")},
    add: (args) => { var acc = 0; args.forEach(a => {acc = acc + a}); return acc }
}

const awesomeeval = (expr) => {

    if(false == isNaN( parseInt(expr) ))
        return parseInt(expr)

    const tokens = expr
    if(false == tokens[0] in functable){
        return "NO FUNC"
    }
    const func = functable[tokens[0]]
    const args = tokens.slice(1)
    const evalargs = args.map( arg => awesomeeval(arg))
    const result = func(evalargs)
    return result
}


const awesomeparse = (expr) => {
    return JSON.parse(expr)
}
    
    //"inputexpression": {async handler(n,o) {
    //    if(this.inputexpression == "")
    //        return
    //    try{
    //        this.lastinputexpression = this.inputexpression
    //    }catch(e){
    //    }
    //    this.inputexpression = ""
    //},}



        //awesomeeval: function(expr){
        //    //const parsed = awesomeparse(expr)
        //    const parsed = sexpr(expr)[0]
        //    return awesomeeval(parsed)
        //    //return parsed
        //}

        evaljsarea: function() {
            //this.jsevalresult = "yay eval this: " + this.jsarea + eval(this.jsarea)
            this.jsevalresult = eval(this.jsarea)
        }



            parsed : function() {return this.sexpr(this.expr)},
            evalresult : function() {
                if(this.lastinputexpression == "")
                    return "No eval yet"
                return awesomeeval(this.sexpr(this.lastinputexpression)[0])
            },



