
Vue.component('up',{
  template:/*html */`
    <input type="button" value="改下面的資料" @click="edit">
  `,
  methods:{
    edit(){
      eventBUS.$emit('godown','abc')
    }
  }
})