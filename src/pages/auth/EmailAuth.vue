<template>
  <v-form v-slot="{ handleSubmit }">
    <q-form @submit="handleSubmit(getAuthCode)">
      <v-field
        v-slot="{ field, handleChange, errorMessage }"
        :label="$t('auth.email')"
        name="email"
        rules="required"
      >
        <q-input
          autofocus
          :label="$t('auth.email')"
          :model-value="field.value"
          :error="!!errorMessage"
          :error-message="errorMessage"
          @update:modelValue="handleChange"
        />
      </v-field>
      <div class="q-pt-md flex justify-center">
        <q-btn
          type="submit"
          color="primary"
          unelevated
          :label="$t('auth.getCode')"
          :loading="requestingCode"
        />
      </div>
    </q-form>
  </v-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Form, Field } from 'vee-validate';
import { getAuthCodeByEmail } from '@api/user';

interface IAuthData {
  email: string;
}

@Options({
  components: {
    VForm: Form,
    VField: Field,
  },
})
export default class Auth extends Vue {
  requestingCode: boolean = false;

  async getAuthCode(signInData: IAuthData) {
    try {
      this.requestingCode = true;

      const { email } = signInData;

      const response = await getAuthCodeByEmail(email);

      const { codeId, isRegistered } = response;

      this.$emit('codeSended', codeId, isRegistered);

      this.requestingCode = false;
    } catch {
      this.requestingCode = false;
    }
  }
}
</script>
