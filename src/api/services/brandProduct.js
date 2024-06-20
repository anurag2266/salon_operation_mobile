import http from '../http';

export async function getproductBrand(data) {
  return http.brandProduct.get('getbrand', data);
}
