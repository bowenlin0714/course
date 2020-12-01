<template>
  <div id="app">
    <button @click="check">檢查登入</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    check () {
      this.axios.get('http://localhost:3000/users/heartbeat')
        .then(res => {
          alert(res.data)
        })
    }
  }
}
</script>
