<template>
  <div class="product">
    <button @click="logout">登出</button>
    <form @submit.prevent="submit">
      <input type="text" v-model="name">
      <input type="file" @change="addfile">
      <input type="submit" value='上傳' >
    </form>
    <hr>
    <h1>登入成功</h1>
    <table border="1">
      <tr v-for="product in products" :key="product._id">
        <td>
          <img :src="'http://localhost:3000/products/images/' + product.file" alt="">
        </td>
        <td>
          {{ product.name }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      file: null,
      name: '',
      products: []
    }
  },
  methods: {
    addfile (e) {
      // 將file 改為使用者選擇的檔案
      this.file = e.target.files[0]
    },
    submit () {
      // 建立一個 FormData 傳送檔案和資料
      const fd = new FormData()
      // 添加資料進 formData
      // fd.append(欄位，資料)
      fd.append('file', this.file)
      fd.append('name', this.name)

      this.axios.post('http://localhost:3000/products/', fd)
        .then(res => {
          console.log(res)
          this.products.push(res.data.result)
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout () {
      this.axios.delete('http://localhost:3000/users/logout')
        .then(res => {
          this.$store.commit('logout')
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.response.data.message)
        })
    }
  },
  mounted () {
    this.axios.get('http://localhost:3000/products')
      .then(res => {
        this.products = res.data.result
      })
  }
}

</script>
