<template>
  <div>
    <sign-in-pending v-if="userSession.isSignInPending()"></sign-in-pending>
    <landing v-else-if="!userSession.isUserSignedIn()"></landing>
    <dashboard  v-if="user" :user="user"></dashboard>

  </div>
</template>

<script>
import Landing from '@/views/Landing.vue'
import SignInPending from '@/views/SignInPending.vue'

import Dashboard from '@/views/Dashboard.vue'
import { Person } from 'blockstack'
import { userSession } from '../userSession'

import { User, getConfig
  // UserGroup, GroupInvitation
} from 'radiks'

export default {
  name: 'Home',
  components: { Landing, Dashboard, SignInPending },
  created () {
    this.userSession = userSession
  },
  mounted () {
    if (userSession.isUserSignedIn()) {
      this.handleSignedIn()
    } else if (userSession.isSignInPending()) {
      this.handleSignIn()
    }
  },
  data () {
    return {
      userSession: null,
      user: null
    }
  },
  methods: {
    async handleSignedIn () {
      console.log('handleSignedIn')
      this.userData = userSession.loadUserData()
      this.user = new Person(this.userData.profile)
      this.user.username = this.userData.username
    },
    async handleSignIn () {
      console.log('handleSignIn')
      const { userSession } = getConfig()
      await userSession.handlePendingSignIn()
      await User.createWithCurrentUser()
      window.location = window.location.origin
    }
  }
}
</script>
