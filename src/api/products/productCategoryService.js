import http from '../http';

export async function getProductCategoryAPI() {
  return http.productCategory.get('getProductCategory');
}
