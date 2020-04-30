<template>
  <header>
    <div class="justify-content-between">
      <div id="user_info" class="d-flex">
        <img src="/img/avatar.png" />
        <h5>Olá, Thiago Rocha!</h5>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px;
  background-color: #23262b;
  color: #595c63;
}

#user_info {
  padding: 0px 10px;
  align-items: center;
}

#user_info img {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}

.d-flex {
  display: flex;
}
</style>
