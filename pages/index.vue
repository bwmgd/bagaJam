<template>
  <div class="center">
    <div>
      <logo/>
      <h2 class="subtitle">八嘎酱为您提供服务 </h2>
      <router-link to="/bagajam">
        <el-button type="primary" round>
          <span class="btn">八嘎酱企业微信推送</span>
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
  }
}
</script>

<style>
.center {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.btn {
  font-size: larger;
}

</style>
