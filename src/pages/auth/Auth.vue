<template>
  <q-page class="container q-pa-md q-pa-md-lg flex flex-center">
    <div class="sign-in row q-col-gutter-md">
      <div class="col-12 title text-center">
        {{ $t('auth.title') }}
      </div>
      <div class="col-12 sub-title text-center">
        {{ subTitle }}
      </div>
      <div class="col-12">
        <email-auth
          v-if="mode === 'get-code'"
          @code-sended="onCodeSended"
        />
        <register-form
          v-else-if="mode === 'register'"
          :code-id="codeId"
          @auth="onAuth"
        />
        <validate-code-form
          v-else
          :code-id="codeId"
          @auth="onAuth"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters } from 'vuex';

import { IUser } from '@models/IUser';

import PhoneAuth from './PhoneAuth.vue';
import EmailAuth from './EmailAuth.vue';
import RegisterForm from './RegisterForm.vue';
import ValidateCodeForm from './ValidateCodeForm.vue';

enum AuthMode {
  GetCode = 'get-code',
  Register = 'register',
  ValidateCode = 'validate-code',
}

@Options({
  components: {
    PhoneAuth,
    EmailAuth,
    RegisterForm,
    ValidateCodeForm,
  },
  computed: {
    ...mapGetters('user', [
      'user',
    ]),
  },
})
export default class Auth extends Vue {
  user!: IUser;

  codeId: string = '';
  mode: AuthMode = AuthMode.GetCode;

  get subTitle() {
    return {
      [AuthMode.GetCode]: this.$t('auth.getCodeText'),
      [AuthMode.Register]: this.$t('auth.registerText'),
      [AuthMode.ValidateCode]: this.$t('auth.validateCodeText'),
    }[this.mode];
  }

  mounted() {
    if (this.user) {
      void this.$router.push('/menu');
    }
  }

  onCodeSended(codeId: string, isRegistered: boolean) {
    this.codeId = codeId;

    this.mode = isRegistered ? AuthMode.ValidateCode : AuthMode.Register;
  }

  onAuth() {
    void this.$router.push('/menu');
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  max-width: 600px;
}

.title {
  color: $grey-8;
  font-weight: 700;
  font-size: 1.2rem;
}
</style>
