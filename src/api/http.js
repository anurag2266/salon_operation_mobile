import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { ValueChanged } from '../redux/actions/flightActions';
import { clearStorage, getToken } from '../utils/localStorage';
import { persistedStore, store } from '../redux/store';

const createAxios = baseURL => {
  const Axios = axios.create({
    baseURL: baseURL,
    // timeout: 10000,
    timeoutErrorMessage: 'Request Timeout',
    onDownloadProgress: progressEvent => {
      let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;

      store.dispatch(
        ValueChanged('uploadPercent', parseFloat(percentCompleted).toFixed(2)),
      );
    },
    onUploadProgress: progressEvent => {
      let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;

      store.dispatch(
        ValueChanged('uploadPercent', parseFloat(percentCompleted).toFixed(2)),
      );
    },
  });

  Axios.interceptors.response.use(
    async response => {
      console.log('response from interceptor', response.data);
      return response.data;
    },
    async error => {
      console.log('error from interceptor', error.response);
      let originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        // if the error is 401 and hasent already been retried
        originalRequest._retry = true; // now it can be retried
        try {
          const token = getToken();
          console.log('my login token-->>', token);
          Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return Axios(originalRequest);
        } catch (error) {
          if (error.response.status === 401) {
            // logout dispatch
            console.log('Session Expired');
            showMessage({ message: 'Session Expired', type: 'danger' });
            //clearStorage();
            store.dispatch(ValueChanged('isLogin', false));
            store.dispatch(ValueChanged('userDetails', {}));
            store.dispatch(ValueChanged('salonDetails', {}));
          }
        }
      }
      return error.response.data ? error.response.data : error.response;
    },
  );

  Axios.interceptors.request.use(
    async config => {
      const token = getToken();
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    error => {
      console.log('hitestehlkfhsdlhf', error);
      // return Promise.reject(error.response.data);
      if (error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        console.log(error);
        return Promise.reject(error.response);
      }
    },
  );

  return Axios;
};

const userService = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4000/api/v1/user',
);
const salonBasicService = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4020/api/v1/salonBasic',
);
const stylistService = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4000/api/v1/stylist/',
);
const salonService = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4040/api/v1/salonService/',
);
const categoryService = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4040/api/v1/serviceCategory',
);
const subCategoryService = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4040/api/v1/serviceSubCategory/',
);
const Product = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4030/api/v1/product',
);

const SalonMapServices = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4040/api/v1/salonMap/',
);

const AddBusinessCategory = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4020/api/v1/salonCategory',
);
const locationMaster = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4050/api/v1/',
);
const requestService = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4040/api/v1/requestService/',
);
const brandMaster = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4030/api/v1/brand/',
);
const searchTagMaster = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4040/api/v1/servicetag/',
);
const productMap = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4030/api/v1/productMap/',
);
const productCategory = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4030/api/v1/ProductCategory/',
);
const productSubCategory = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4030/api/v1/ProductSubCategory/',
);
const requestProduct = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4030/api/v1/requestProduct/',
);
const discountCardData = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/discountcardData/',
);
const membershipData = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/membershipdata/',
);
const couponData = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/couponData/',
);
const loyalityPointData = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/loyaltypointData/',
);

const stylistCategory = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4000/api/v1/stylistCategory/',
);
const stylistSubCategory = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4000/api/v1/StylistSubCategory',
);
const stylistData = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4000/api/v1/stylist/',
);

const comboOffers = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/offerData/',
);

const cashbackData = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/cashbackData/',
);

const happyHours = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/happyhourData/',
);

const specialDiscount = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/specialdiscountData/',
);

const giftCard = createAxios(
  'http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/giftcardData/',
);

const packageData = createAxios(
  "http://ec2-35-172-219-149.compute-1.amazonaws.com:4060/api/v1/packageData/"
)

const inventoryService = createAxios(
  "http://ec2-35-172-219-149.compute-1.amazonaws.com:4080/api/v1/inventoryMaster/"
)
const http = {
  userService,
  salonBasicService,
  stylistService,
  salonService,
  categoryService,
  subCategoryService,
  Product,
  SalonMapServices,
  AddBusinessCategory,
  locationMaster,
  requestService,
  brandMaster,
  searchTagMaster,
  productMap,
  productCategory,
  productSubCategory,
  requestProduct,
  discountCardData,
  membershipData,
  couponData,
  loyalityPointData,
  packageData,
  inventoryService,
  stylistCategory,
  stylistData,
  stylistSubCategory,
  comboOffers,
  cashbackData,
  happyHours,
  specialDiscount,
  giftCard,
};

export default http;
