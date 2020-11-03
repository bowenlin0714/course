
Vue.component('down',{
  template:/*html */`
    <h1>{{text}}</h1>
  `,
  data(){
    return{
      text:'123'
    }
  },
  mounted(){
    eventBUS.$on('godown',(value)=>{
      this.text = value
    })
  }
})