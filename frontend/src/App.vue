<script>

import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

    
export default {
	components: { },
	setup () {
		return {
		}
	},


  watch: {
    "env.thedatamodel": { async handler(newr, oldr) {
            }, deep:true,
        },
      },

	methods: {
	},

	computed: {
	},


  async mounted() {
  }
}

</script>

<template>

    <div class="bg-red-100">
        wat
    </div>
</template>

