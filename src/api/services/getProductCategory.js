import http from '../http';

export async function getproductCategory(data) {
  return http.categoryProduct.get('getProductCategory', data);
}
