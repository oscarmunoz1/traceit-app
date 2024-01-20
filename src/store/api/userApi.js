import { USER_URL } from '../../config';
import baseApi from './baseApi';
import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { setUser } from '../features/userSlice';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ userId, userData }) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(userData)) {
          formData.append(key, value);
        }

        return {
          url: USER_URL(userId),
          method: 'PATCH',
          credentials: 'include',
          body: formData,
          formData: true
        };
      },
      invalidatesTags: (result, error, { userId }) => [{ type: 'User', userId }]
    })
  })
});

export const { useGetMeQuery, useUpdateUserMutation } = userApi;
