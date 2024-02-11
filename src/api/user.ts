import axios from 'axios';

import { api } from '@boot/axios';
import { IAddress } from '@models/IAddress';
import { IUser } from '@models/IUser';

export interface IUpdateUser {
  name: string;
}

interface AuthWithCodeData {
  code: string;
  codeId: string;
}

interface RegisterWithCodeData {
  code: string;
  codeId: string;
  name: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export async function getUserData(): Promise<IUser> {
  const response = await api.get<IUser>('users/me');

  return response.data;
}

export async function updateUser(user: IUpdateUser) {
  const response = await api.patch<IUser>('users', user);

  return response.data;
}

export async function refreshToken(
  refreshToken: string,
): Promise<ISignInResponse> {
  const response = await api.post<ISignInResponse>('users/refresh-token', {
    refreshToken,
  });

  return response.data;
}

export async function getAuthCodeByPhone(phone: string): Promise<never> {
  const response = await api.post<never>('users/get-code-by-phone', { phone });
  return response.data;
}

export async function getAuthCodeByEmail(email: string): Promise<never> {
  const response = await api.post<never>('users/get-code-by-email', { email });
  return response.data;
}

export async function authWithCode(
  data: AuthWithCodeData,
): Promise<ISignInResponse> {
  const response = await api
    .post<ISignInResponse>('users/auth/with-code', data);

  return response.data;
}

export async function registerWithCode(
  data: RegisterWithCodeData,
): Promise<ISignInResponse> {
  const response = await api
    .post<ISignInResponse>('users/register/with-code', data);

  return response.data;
}

export async function getAddressFromZipCode(
  zipCode: string,
): Promise<IAddress> {
  const response = await axios
    .get<never>(`https://viacep.com.br/ws/${zipCode}/json/`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { cep, logradouro, bairro, localidade, uf, erro } = response.data;

  if (erro) {
    throw new Error('ADDRESS_NOT_FOUND');
  }

  return {
    zipCode: cep,
    state: uf,
    city: localidade,
    neighborhood: bairro,
    streetName: logradouro,
    number: '',
    complement: '',
  };
}
