<script>
import {sexpr} from './sexpr.js'
import keyboard from './keyboard.js'
const {...stuff} = keyboard()

import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

const hooha = "hellohooha"
const fuckobj = {}
fuckobj.name = "fuck yeah"

const expr1   = ref('(concat "hello world" (concat "other"))')
const expr2   = ref('(add 1 1 1)')
const expr    = ref('(add 1 1 (add 1 1) )')
//const expr = ref('(concat "hello world")')

//const mytree =  [0,1,1,2,0]
const mystring =
`
dc
 dr
  d
  d
 dc
  dc
   dr
    d
    d
  dc
   dr
    d
    d
   dr
    d
    d
d
`

const mysource =
`
const tokens = mystring.trim().split("\\n")
const tokenswithdepth = tokens.map(t => [t.length - t.trimLeft().length ,t.trimLeft()])
const nestinglist = tokenswithdepth.map(tuple=>tuple[0])
nestinglist

const mytree = nestinglist


const spaces = (index) => Array.from({length:tokenswithdepth[index][0]*2}).map(f => " ").join("")

var position = -1
var result = ""
for(var i = 0; i < mytree.length; i++){
    if(mytree[i] == position) {
        result += spaces(i) + "</div>\\n" + spaces(i)+  "<" + tokenswithdepth[i][1] + ">\\n" 
    } 
    else if(mytree[i] > position) {
        result += spaces(i) + "<" + tokenswithdepth[i][1] + ">\\n"
    }
    else if(mytree[i] < position) {
        const times = (position - mytree[i] + 1)
        for(var j = 0; j< times; j++){
            result += spaces(i) + "</div>\\n"
        }
        result += spaces(i) + "poop" + "<" + tokenswithdepth[i][1] + ">\\n"
    }
    position = mytree[i]
}

const times = position + 1
for(var j = 0; j< times; j++){
    result += "</div>\\n"
}


result = result.replaceAll("\\<dc>", '<div class="flex flex-col">')
result = result.replaceAll("\\<dr>", '<div class="flex flex-row">')
result = result.replaceAll("\\<d>", '<div>')
//tokenswithdepth


`


const __mysource = 
`
//
//const decend = (tree,level) => {
//    const copytree = JSON.parse(JSON.stringify(tree))
//    tree.forEach(element => {
//        if(element[0] == " "){
//             //tree.push([t,decend(
//        }
//    })
//
//    return tree
//}

//result

//decend(tokens,0)

//nestings

//const fuck = [ [1,[1,[]],[1,[[1,[]] ]        ,     [1,[]] ]]]
//fuck



`

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
            jsarea:ref(""),
            jsevalresult:ref(""),
            mysource:ref(mysource),
		}
	},


  watch: {
    "env.thedatamodel": { async handler(newr, oldr) {
            }, deep:true,
        },

    //"inputexpression": {async handler(n,o) {
    //    if(this.inputexpression == "")
    //        return
    //    try{
    //        this.lastinputexpression = this.inputexpression
    //    }catch(e){
    //    }
    //    this.inputexpression = ""
    //},}

      },

	methods: {
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
	},

	computed: {
            parsed : function() {return this.sexpr(this.expr)},
            evalresult : function() {
                if(this.lastinputexpression == "")
                    return "No eval yet"
                return awesomeeval(this.sexpr(this.lastinputexpression)[0])
            },

            jsevalresult_sourcefile: function() {

                return eval(mysource)
            }

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

    <div class="sectionA bg-purple-400">


        <div class="flex flex-col">
           <div class="flex flex-row">
              <div>
                Account Register
              </div>
              <div>
                My Awesome Account
              </div>
           </div>
           <div class="flex flex-col">
              <div class="flex flex-col">
                 <div class="flex flex-row">
                    <div>
                        2022/12/18
                    </div>
                    <div>
                        Bought stuff
                    </div>
                 </div>
              </div>
              <div class="flex flex-col">
                 <div class="flex flex-row">
                    <div>
                        Account 1
                    </div>
                    <div>
                        $5000.00
                    </div>
                 </div>
                 <div class="flex flex-row">
                    <div>
                        Account 2
                    </div>
                    <div>
                        {{}}
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div>
        </div>


    </div>



    <div class="sectionA bg-red-100">
        <div class="sectionA bg-blue-100"> JS AREA </div>

        <div class="w-[800px] h-[200px] bg-green-100 border border-black p-2">
            <div>USER INPUT AREA</div>
            <textarea class="w-32 h-32" :value="this.jsarea"
                @input="event => this.jsarea = event.target.value"
                />
        </div >
        <div class="m-2 w-16 h-18 bg-purple-400 p-2 border border-black rounded-xl"
            @click="this.evaljsarea()">
            EVAL JS
        </div >
        <div>
            <div> EVAL RESULT </div>
            <div> {{jsevalresult}} </div>
        </div>
    </div>
    <div class="sectionA">
        RESULT OF SOURCE FILE {{jsevalresult_sourcefile}} 
    </div>
    <div class="sectionA">
        RESULT <pre><code lang="html">{{jsevalresult_sourcefile}} </code></pre>
    </div>
    <div class="sectionA">
        {{mysource}}
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


    <div class="p-1 m-1 bg-blue-100">
        WORKING AREA: {{workingarea}}
    </div>
    <div v-if='true' class="sectionA">
        Eval: {{evalresult}}
    </div>



-->
