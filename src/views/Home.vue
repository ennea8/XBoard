<template>
  <div>
    <landing v-if="! userSession.isUserSignedIn()"></landing>
    <dashboard v-if="user" :user="user"></dashboard>

  </div>
</template>

<script>
import Landing from '@/views/Landing.vue'
import Dashboard from '@/views/Dashboard.vue'
import { Person } from 'blockstack'
import { userSession } from '../userSession'

export default {
  name: 'Home',
  components: { Landing, Dashboard },
  created () {
    this.userSession = userSession
  },
  mounted () {
    if (userSession.isUserSignedIn()) {
      this.userData = userSession.loadUserData()
      this.user = new Person(this.userData.profile)
      this.user.username = this.userData.username
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
        .then((userData) => {
          window.location = window.location.origin
        })
    }
  },
  data () {
    return {
      userSession: null,
      user: null
    }
  }
}
</script>
