<template>
  <div class="center">
    <div class="panel-landing" id="section-1">
      <h1 class="landing-heading">Wecome on XBoard!</h1>
      <p class="lead">
        <a
                href="#"
                class="btn btn-primary btn-lg"
                id="signin-button"
                @click.prevent="signIn"
        >
          Sign In with Blockstack
        </a>
      </p>
    </div>
  </div>

</template>

<script>
import { userSession } from '../userSession'
export default {
  name: 'signin',
  methods: {
    signIn () {
      userSession.redirectToSignIn()
    }
  }
}
</script>

<style scoped></style>
