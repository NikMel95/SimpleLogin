<template>
  <div :class="'login-form ' + classForm">
    <div class="login-form-avatar">
      <i class="fas fa-user"></i>
    </div>
    <form class="" @submit.prevent="Login(email, password, remember)">
      <div :class="'form-group ' + (error_email ? 'has-error':'')">
        <input class="form-input input-lg" type="text" placeholder="Email" name="email" v-model="email" @keyup="keyUpForm($event, 'email')">
        <p class="form-input-hint" v-if="error_email">{{ error_email_msg }}</p>
      </div>
      <div :class="'form-group ' + (error_password ? 'has-error':'')">
        <input class="form-input input-lg" type="password" placeholder="Пароль" name="password" v-model="password" @keyup="keyUpForm($event, 'pwd')">
        <p class="form-input-hint" v-if="error_password">{{ error_password_msg }}</p>
      </div>
      <div :class="'form-group ' + (error ? 'has-error':'')">
        <p class="form-input-hint" v-if="error">{{ error_msg }}</p>
      </div>
      <div class="form-group">
        <label class="form-switch">
          <input type="checkbox" v-model="remember">
          <i class="form-icon"></i> Запомнить меня?
        </label>
      </div>
      <button class="btn btn-primary btn-lg">Войти</button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { LOGIN, CHECK_REM } from '@/store/actions.type'

export default {
  name: 'spHome',
  data () {
    return {
      email: '',
      password: '',
      remember: true,
      classForm: 'load-form',
      error: false,
      error_msg: '',
      error_email: false,
      error_email_msg: '',
      error_password: false,
      error_password_msg: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentRem',
      'isAuthenticated'
    ])
  },
  watch: {
    currentRem (res) {
      this.email = res.email
      this.password = res.password
    }
  },
  mounted () {
    if(this.isAuthenticated) {
      this.$router.push({name: 'Lk'})
    }
    this.email = this.currentRem.email
    this.password = this.currentRem.password
    this.$store.dispatch(CHECK_REM)
  },
  methods: {
    Login (email, password, remember) {
      
      this.error = false
      this.error_msg = ''
      this.setPasswordEmail(!this.validateEmail(email))
      this.setPasswordAction(password == '' ? true:false)
      if(!this.error_email && !this.error_password) {
        if(email != 'test@test.ru' || password != '123456') {
          this.error = true
          this.error_msg = 'Не верный email или пароль'
        } else {
          var user = {
            email: email,
            password: password,
            remember: remember
          }
          this.$store
            .dispatch(LOGIN, user, remember)
            .then((data) => {
              this.$router.push({name: 'Lk'})
            })
        }
      }
    },
    keyUpForm (e, elem) {
      this.error = false
      this.error_msg = ''
      var current_value = e.target.value
      if(elem == 'email') {
        this.setPasswordEmail(!this.validateEmail(current_value))
      }
      if(elem == 'pwd') {
        this.setPasswordAction(current_value == '' ? true:false)
      }
    },
    setPasswordEmail(status) {
      if(status) {
        this.error_email = true
        this.error_email_msg = 'Не верный формат Email'
      } else {
        this.error_email = false
        this.error_email_msg = ''
      }
    },
    setPasswordAction(status) {
      if(status) {
        this.error_password = true
        this.error_password_msg = 'Введите пароль'
      } else {
        this.error_password = false
        this.error_password_msg = ''
      }
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
}
</script>