<script>
import {sexpr} from './sexpr.js'
import keyboard from './keyboard.js'
const {...stuff} = keyboard()

import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

const expr1   = ref('(concat "hello world" (concat "other"))')
const expr2   = ref('(add 1 1 1)')
const expr    = ref('(add 1 1 (add 1 1) )')
//const expr = ref('(concat "hello world")')

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
    
export default {
	components: { },
	setup () {
		return {
            expr:expr,
            sexpr:sexpr,
            inputexpr: ref(""),
            lastinputexpression: ref(""),
            ...stuff,
		}
	},


  watch: {
    "env.thedatamodel": { async handler(newr, oldr) {
            }, deep:true,
        },

    "inputexpression": {async handler(n,o) {
        if(this.inputexpression == "")
            return
        try{
            this.lastinputexpression = this.inputexpression
        }catch(e){
        }
        this.inputexpression = ""
    },}

      },

	methods: {
        //awesomeeval: function(expr){
        //    //const parsed = awesomeparse(expr)
        //    const parsed = sexpr(expr)[0]
        //    return awesomeeval(parsed)
        //    //return parsed
        //}
	},

	computed: {
            parsed : function() {return this.sexpr(this.expr)},
            evalresult : function() {
                if(this.lastinputexpression == "")
                    return "No eval yet"
                //return "FUCK"
                return awesomeeval(this.sexpr(this.lastinputexpression)[0])
                //return awesomeeval(this.sexpr("(add 1 1)")[0])
            },
	},


  async mounted() {
  }
}

</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .sectionA  {
        @apply border border-black p-1 m-1
    }

}
</style>

<template>

    <div class="bg-red-100">
        wat
    </div>
    <div class="p-1 m-1 bg-blue-100">
        WORKING AREA: {{workingarea}}
    </div>
    <div v-if='true' class="sectionA">
        Eval: {{evalresult}}
    </div>
    <div class="sectionA bg-red-100">
        JS AREA
        <div class="w-[100px] h-[100px]">
            <input class="w-full h-full" value="hello"/>
        </div >
    </div>
</template>

<!-- 
    <div class="p-1 m-1 bg-blue-100">
        INPUT EXPR: {{inputexpression}}
    </div>
    <div class="bg-red-100">
        EXPR: {{expr}}
    </div>
    <div class="bg-red-100">
        Parsed: {{parsed}}
    </div>
    <div class="bg-red-100">
        Eval: {{awesomeeval(expr)}}
    </div>

-->
