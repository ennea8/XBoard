<template>
  <div class="nav">
    <!--<div class="avatar-section">-->
      <!--<img :src="avatar" class="img-rounded avatar" id="avatar-image">-->
    <!--</div>-->
    <!--<h1 class="landing-heading">Hello, <span id="heading-name">{{ givenName }}</span>!</h1>-->
    <div class="app-info">XBoard </div>

    <div class="right-area">
      <img :src="avatar" class="img-rounded avatar" id="avatar-image">
      <el-button type="text" @click.prevent="signOut">Logout</el-button>
    </div>
  </div>
</template>

<script>
import { userSession } from '../userSession'
export default {
  methods: {
    signOut () {
      userSession.signUserOut(window.location.href)
    }
  },
  data () {
    return {
      blockstack: window.blockstack,
      avatar: 'https://s3.amazonaws.com/onename/avatar-placeholder.png',
      givenName: 'Anonymous'
    }
  },
  mounted () {
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      const profile = blockstack.loadUserData().profile
      const user = new blockstack.Person(profile)
      this.givenName = user.name() ? user.name() : 'Nameless Person'
      if (user.avatarUrl()) this.avatar = user.avatarUrl()
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
        .then((userData) => {
          window.location = window.location.origin
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .nav{
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    padding: 0 10px 0 10px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .app-info{
      float: left;
      line-height: 50px;
    }
    .right-area{
      float:right;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;

      .avatar{
        width: 30px;
        height: 30px;
      }
    }
  }
</style>
