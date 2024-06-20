import http from '../http';

export async function getProductSubCategoryAPI() {
  return http.productSubCategory.get('getProductSubCategory');
}
export async function getProductSubCategoryByCategoryIdAPI(categoryId) {
  return http.productSubCategory.get(
    `getProductSubCategory?parentId=${categoryId}`,
  );
}
