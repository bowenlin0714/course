Vue.component('out',{
  template:/*html */`
    <div>
      <input type="button" value='1' @click="out(1)">
      <input type="button" value='2' @click="out(2)">
      <input type="button" value='3' @click="out(3)">
    </div>
  `,
  methods:{
    out(value){
      // 觸發一個自訂事件，將值傳出
      this.$emit('apple',value)
    }
  }
})