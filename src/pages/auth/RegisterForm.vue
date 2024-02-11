<template>
  <v-form v-slot="{ handleSubmit }">
    <q-form
      class="q-col-gutter-md"
      @submit="handleSubmit(register)"
    >
      <v-field
        v-slot="{ field, handleChange, errorMessage }"
        :label="$t('auth.name')"
        name="name"
        rules="required"
      >
        <q-input
          autofocus
          :label="$t('auth.name')"
          :model-value="field.value"
          :error="!!errorMessage"
          :error-message="errorMessage"
          @update:modelValue="handleChange"
        />
      </v-field>
      <v-field
        v-slot="{ field, handleChange, errorMessage }"
        :label="$t('auth.phone')"
        name="phone"
        rules="required|min:14"
      >
        <q-input
          inputmode="tel"
          :label="$t('auth.phone')"
          :mask="getPhoneMask(field.value)"
          :model-value="field.value"
          :error="!!errorMessage"
          :error-message="errorMessage"
          @update:modelValue="handleChange"
        />
      </v-field>
      <v-field
        v-slot="{ field, handleChange, errorMessage }"
        :label="$t('auth.code')"
        name="code"
        rules="required|min:6"
      >
        <q-input
          inputmode="number"
          maxlength="6"
          :label="$t('auth.code')"
          :model-value="field.value"
          :error="!!errorMessage"
          :error-message="errorMessage"
          @update:modelValue="handleChange"
        />
      </v-field>
      <div class="flex justify-center">
        <q-btn
          type="submit"
          color="primary"
          unelevated
          :label="$t('auth.submitRegister')"
          :loading="loading"
        />
      </div>
    </q-form>
  </v-form>
</template>

<script lang="ts">
import { Vue, Options, Prop } from 'vue-property-decorator';
import { Form, Field } from 'vee-validate';
import { mapActions } from 'vuex';

import { registerWithCode } from '@api/user';
import { ITokenData } from '@store/user/actions';

interface IRegisterData {
  name: string;
  code: string;
}

@Options({
  components: {
    VForm: Form,
    VField: Field,
  },
  methods: {
    ...mapActions('user', ['processLogin']),
  },
})
export default class Auth extends Vue {
  processLogin!: (data: ITokenData) => Promise<never>;

  @Prop({ required: true }) codeId!: string;

  loading: boolean = false;

  getPhoneMask(phone: string = '') {
    return phone.length <= 14 ? '(##) ####-#####' : '(##) #####-####';
  }

  async register(signInData: IRegisterData) {
    try {
      this.loading = true;

      const response = await registerWithCode({
        ...signInData,
        codeId: this.codeId,
      });

      await this.processLogin(response);

      this.$emit('auth');

      this.loading = false;
    } catch {
      this.loading = false;
    }
  }
}
</script>
