<template lang="pug">
  //- Vue 的背景圖要寫行內只能用 v-bind style 讀取 public 的圖片
  //- 要讀 src 請寫在 css
  #main(:style="{backgroundImage: 'url(./images/0101.jpg)'}")
    //- Vue 的 img src 用 v-bind 時 ./ 代表 public 資料夾
    //- 沒有用 v-bind 的話會找 src，@ 代表 src 資料夾
    img(src="@/assets/0104.jpg")
    br
    br
    p
      | 嗨！歡迎加入國立科技高中。
      br
      | 參加社團不僅可以豐富自己的人生、寬闊自己的視野，
      br
      | 也能砥礪技能、磨練人際、培養第二專長。
      br
      | 選擇一項您喜歡的社團，積極的參與和投入，
      br
      | 您會獲得一陣陣的驚喜！
</template>

<script>
export default {
  name: 'Main'
}
</script>
