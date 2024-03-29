import {
  ESTABLISHMENT_CHART_SCANS_VS_SALES_INFO_URL,
  ESTABLISHMENT_HISTORIES_URL,
  ESTABLISHMENT_PRODUCTS_URL,
  LOGIN_URL,
  PARCEL_UPDATE_URL,
  PARCEL_URL,
  PRODUCT_URL
} from '../../config';

//   import { EmployeeType } from "../../types/employees";
import baseApi from './baseApi';
import { logout as logoutUser } from 'store/features/authSlice';
import { setCompany } from 'store/features/companySlice';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getParcel: build.query({
      query: ({ companyId, establishmentId, parcelId }) => ({
        url: PARCEL_URL(companyId, establishmentId, parcelId),
        method: 'GET',
        credentials: 'include'
      }),
      providesTags: (result, error, parcelId) => (result ? [{ type: 'Parcel', parcelId }] : [])
    }),
    createParcel: build.mutation({
      query: ({ companyId, establishmentId, parcelData }) => {
        const formData = new FormData();
        parcelData.album.images.forEach((file) => {
          formData.append('album[images]', file);
        });

        formData.append('name', parcelData.name);
        formData.append('description', parcelData.description);
        formData.append('area', parcelData.area);
        formData.append('certified', parcelData.certified);
        formData.append('polygon', JSON.stringify(parcelData.polygon));
        formData.append('map_metadata', JSON.stringify(parcelData.map_metadata));
        formData.append('establishment', establishmentId);

        return {
          url: PARCEL_URL(companyId, establishmentId),
          method: 'POST',
          credentials: 'include',
          body: formData,
          formData: true
        };
      },
      invalidatesTags: (result) => (result ? ['Parcel'] : [])
    }),
    updateParcel: build.mutation({
      query: ({ companyId, establishmentId, parcelId, parcelData }) => {
        const formData = new FormData();
        parcelData.album.images.forEach((file) => {
          formData.append('album[images]', file);
        });

        formData.append('name', parcelData.name);
        formData.append('description', parcelData.description);
        formData.append('area', parcelData.area);
        formData.append('certified', parcelData.certified);
        formData.append('polygon', JSON.stringify(parcelData.polygon));
        formData.append('map_metadata', JSON.stringify(parcelData.map_metadata));

        return {
          url: PARCEL_URL(companyId, establishmentId, parcelId),
          method: 'PATCH',
          credentials: 'include',
          body: formData,
          formData: true
        };
      },
      invalidatesTags: (result, error, { parcelId }) => [{ type: 'Parcel', parcelId }]
    }),
    getProducts: build.query({
      query: () => ({
        url: PRODUCT_URL,
        method: 'GET',
        credentials: 'include'
      })
    }),
    getEstablishmentProducts: build.query({
      query: ({ companyId, establishmentId, parcelId }) => ({
        url:
          ESTABLISHMENT_PRODUCTS_URL(companyId, establishmentId) +
          (parcelId ? `?parcel=${parcelId}` : ''),
        method: 'GET',
        credentials: 'include'
      })
    }),
    getEstablishmentHistories: build.query({
      query: ({ companyId, establishmentId, parcelId, productId, periodId }) => ({
        url:
          ESTABLISHMENT_HISTORIES_URL(companyId, establishmentId) +
          (parcelId ? `?parcel=${parcelId}` : '') +
          (productId ? `&product=${productId}` : '') +
          (periodId ? `&period=${periodId}` : ''),
        method: 'GET',
        credentials: 'include'
      })
    }),
    getEstablishmentScansVsSalesChartInfo: build.query({
      query: ({ companyId, establishmentId, parcelId, productId, periodId, productionId }) => ({
        url:
          ESTABLISHMENT_CHART_SCANS_VS_SALES_INFO_URL(companyId, establishmentId) +
          (periodId ? `?period=${periodId}` : '') +
          (parcelId ? `&parcel=${parcelId}` : '') +
          (productionId ? `&production=${productionId}` : '') +
          (productId ? `&product=${productId}` : ''),
        method: 'GET',
        credentials: 'include'
      })
    })
  }),
  overrideExisting: false
});

export const {
  useGetParcelQuery,
  useCreateParcelMutation,
  useUpdateParcelMutation,
  useGetProductsQuery,
  useGetEstablishmentProductsQuery,
  useGetEstablishmentHistoriesQuery,
  useGetEstablishmentScansVsSalesChartInfoQuery
} = productApi;
