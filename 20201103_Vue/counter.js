Vue.component('counter',{
  template:` <input type="button" :value="number" @click='number++'> `,
  data(){
    return{
      number:0
    }
  },
  methods:{

  }
})