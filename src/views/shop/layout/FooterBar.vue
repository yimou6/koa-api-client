<template>
  <div class="footer-bar">
    <el-row>
      <el-col :xs="24" :sm="12" :md="8" class="footer-item">
        <ul>
          <li>{{ $t('footer.help') }}</li>
          <li>{{ $t('footer.manager') }}</li>
          <li>{{ $t('footer.directory') }}</li>
          <li>{{ $t('footer.order') }}</li>
        </ul>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" class="footer-item">
        <ul>
          <li>{{ $t('footer.support') }}</li>
          <li>{{ $t('footer.policy') }}</li>
          <li>{{ $t('footer.service') }}</li>
          <li>{{ $t('footer.download') }}</li>
        </ul>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" class="footer-item">
        <ul>
          <li>{{ $t('footer.about') }}</li>
          <li>{{ $t('footer.know') }}</li>
          <li>{{ $t('footer.join') }}</li>
        </ul>
      </el-col>
    </el-row>

    <div class="footer-copy">
      2022 &copy; All rights reserved
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.footer-bar {
  background-color: #333333;
  padding: 30px 0;

  ul {
    li:first-child {
      color: #ffffff;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 16px;
    }
    li {
      color: #bbbbbb;
      font-size: 14px;
      margin: 3px auto;
    }
  }
  .footer-copy {
    font-size: 12px;
    color: #898989;
    text-align: center;
    margin: 40px auto 0;
  }
}
</style>