<template>
  <div>
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
    <div class="components-container board">
      <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
      <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />
      <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" />
    </div>
  </div>
</template>

<script>
import { userSession } from '../userSession'
import Kanban from '@/components/Kanban'

export default {
  components: {
    Kanban
  },
  methods: {
    signOut () {
      userSession.signUserOut(window.location.href)
    }
  },
  data () {
    return {
      blockstack: window.blockstack,
      avatar: 'https://s3.amazonaws.com/onename/avatar-placeholder.png',
      givenName: 'Anonymous',
      // test
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 }
      ],
      list2: [
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 }
      ],
      list3: [
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 }
      ]
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
    margin-bottom: 10px;
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
  .board {
    width: 1000px;
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
  }
  .kanban {
    &.todo {
      .board-column-header {
        background: #4A9FF9;
      }
    }
    &.working {
      .board-column-header {
        background: #f9944a;
      }
    }
    &.done {
      .board-column-header {
        background: #2ac06d;
      }
    }
  }
</style>
