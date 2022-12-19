<script>
import {sexpr} from './sexpr.js'
import keyboard from './keyboard.js'
const {...stuff} = keyboard()

import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

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


const _spaces = (indent) => {
     return (index,offset) => Array.from({length:tokenswithdepth[index][0]*indent - offset*indent}).map(f => " ").join("") 
    }

const spaces = _spaces(4)

var position = -1
var result = ""
for(var i = 0; i < mytree.length; i++){
    if(mytree[i] == position) {
        result += spaces(i,0) + "</div>\\n" + spaces(i,0)+  "<" + tokenswithdepth[i][1] + ">\\n" 
    } 
    else if(mytree[i] > position) {
        result += spaces(i,0) + "<" + tokenswithdepth[i][1] + ">\\n"
    }
    else if(mytree[i] < position) {
        const times = (position - mytree[i] + 1)
        for(var j = 0; j< times; j++){
            result += spaces(i, j-times+1) + "</div>\\n"
        }
        result += spaces(i,0) + "<" + tokenswithdepth[i][1] + ">\\n"
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




export default {
	components: { },
	setup () {
		return {
            expr:ref("(add 1 1)"),
            sexpr:sexpr,
            inputexpr: ref(""),
            lastinputexpression: ref(""),
            ...stuff,
            jsarea:ref(""),
            jsevalresult:ref(""),
            mysource:ref(mysource),
            dslinputarea:ref(""),
            evaldslresult:ref("not eval yet"),
		}
	},


  watch: {
    "env.thedatamodel": { async handler(newr, oldr) {
            }, deep:true,
        },


      },

	methods: {
        evaldslinputarea: function() {
            this.evaldslresult = this.dslinputarea
            return "haha eval"
        }
	},

	computed: {
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
        <div class="sectionA bg-blue-100"> DSL AREA </div>

        <div class="w-[800px] h-[200px] bg-green-100 border border-black p-2">
            <div>USER INPUT AREA</div>
            <textarea class="w-32 h-32" :value="this.jsarea"
                @input="event => this.dslinputarea = event.target.value"
                />
        </div >
        <div class="m-2 w-16 h-18 bg-purple-400 p-2 border border-black rounded-xl"
            @click="this.evaldslinputarea()">
            EVAL DSL
        </div >
        <div class="sectionA">
            <div> EVAL DSL RESULT </div>
            <div> {{evaldslresult}} </div>
        </div>
    </div>

    <div class="mt-5 sectionA">
        SOURCE FILE EVAL
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


const hooha = "hellohooha"
const fuckobj = {}
fuckobj.name = "fuck yeah"

const expr1   = ref('(concat "hello world" (concat "other"))')
const expr2   = ref('(add 1 1 1)')
const expr    = ref('(add 1 1 (add 1 1) )')
//const expr = ref('(concat "hello world")')

//const mytree =  [0,1,1,2,0]

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

-->
