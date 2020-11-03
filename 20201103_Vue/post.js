Vue.component('post',{
  // es6 引號前面加註解html
  template:/*html*/ `
  <div class="post">
    <h1>{{title}}</h1>
    <p>{{text}}</p>
  </div> 
  `,
  // 接收元件進來的資料
  props:{
    // 資料名稱
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
})