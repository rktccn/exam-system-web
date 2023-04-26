<template>
  <div class='home'>
    <div class='left'>
      <span class='title'>在线考试平台</span>
      <nav class='nav'>
        <p class='nav-item'>首页</p>
        <p class='nav-item'>首页</p>
        <p class='nav-item'>首页</p>
        <p class='nav-item'>首页</p>
        <p class='nav-item'>首页</p>
        <p class='nav-item'>首页</p>
      </nav>
    </div>
    <div class='right'>
      <main class='main'>
        1
      </main>
    </div>
  </div>
</template>

<script>
</script>

<style lang='scss' scoped>

.home {
  display: flex;
  flex-direction: row;

  .left {
    position: relative;
    width: 18vw;
    height: 100vh;
    padding-top: 8%;
    border-radius: 25px;
    background-color: rgba(127, 198, 216, 0.3);
  }

  .right {
    flex-grow: 1;
    height: 100vh;
    background-color: #fff;
  }

  .title {
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 28px;
    font-weight: bolder;
    // 调整文字间距
    letter-spacing: 5px;
  }

  .nav {
    padding-left: 16%;
    padding-right: 16%;

    .nav-item {
      margin-bottom: 20px;
      padding: 10px 0;
      font-size: 20px;
      font-weight: bolder;
      cursor: pointer;
    }
  }

  .main {
    padding: 30px 50px;
  }


}


</style>
