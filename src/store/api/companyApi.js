import { COMPANY_URL, ESTABLISHMENT_URL } from "../../config";
import { LOGIN_URL, USER_DATA_URL } from "../../config";

//   import { EmployeeType } from "../../types/employees";
import baseApi from "./baseApi";
import { logout as logoutUser } from "store/features/authSlice";
import { setCompany } from "store/features/companySlice";

//   import { ProfileFormType, UserInfoType } from "../../types/user";

//   import { generateProfile } from "../helpers";

const companyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCompany: build.query({
      query: (companyID) => ({
        url: COMPANY_URL(companyID),
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, companyID) =>
        result ? [{ type: "Company", companyID }] : [],
    }),
    createCompany: build.mutation({
      query: (formData) => {
        // formData.append("file", file);

        return {
          url: COMPANY_URL(),
          method: "POST",
          credentials: "include",
          body: formData,
        };
      },
      invalidatesTags: (result) => (result ? ["Company"] : []),
    }),
    createEstablishment: build.mutation({
      query: (establishment) => ({
        url: ESTABLISHMENT_URL(),
        method: "POST",
        credentials: "include",
        body: establishment,
      }),
      invalidatesTags: (result) => (result ? ["Establishment"] : []),
    }),
    editEstablishment: build.mutation({
      query: ({ establishmentId, establishmentData }) => ({
        url: ESTABLISHMENT_URL(establishmentId),
        method: "PATCH",
        credentials: "include",
        body: establishmentData,
      }),
      invalidatesTags: (result) => (result ? ["Establishment"] : []),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useCreateEstablishmentMutation,
  useEditEstablishmentMutation,
} = companyApi;