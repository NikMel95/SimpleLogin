<template>
  <div class="login-form">
    <div class="login-form-avatar">
      <i class="fas fa-check"></i>
    </div>
    <p class="enter-p">Вы вошли как: {{currentUser.email}} </p>
    <form class="" @submit.prevent="Logout">
      <button class="btn btn-primary btn-lg" @click="Logout">Выйти</button>
    </form>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { LOGOUT } from '@/store/actions.type'

export default {
  name: 'spLk',
  data () {
    return {
      email: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'isAuthenticated',
    ])
  },
  beforeMount() {
    if(!this.isAuthenticated) {
      this.$router.push({name: 'Home'})
    }
  },
  mounted() {
  },
  methods: {
    Logout () {
      this.$store
          .dispatch(LOGOUT)
          .then((data) => {
            this.$router.push({name: 'Home'})
          })
    }
  }
}
</script>