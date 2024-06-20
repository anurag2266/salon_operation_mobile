import http from '../http';

export async function getAllProductMasterAPI() {
  return http.Product.get('getProducts');
}
