<template>
  <div class="home">
    <form  @submit.prevent="login">
      <input type="text" v-model="account">
      <input type="text" v-model="password">
      <input type="submit" value="送出">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.axios.post('http://localhost:3000/users/login', this.$data)
        .then(res => {
          // 修改狀態
          this.$store.commit('login', this.account)
          // 導向到商品頁
          this.$router.push('/product')
        })
        .catch(error => {
          alert(error.response.data.message)
        })
    }
  }
}
</script>
