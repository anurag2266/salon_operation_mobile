import http from '../http';

export async function getSubCategoriesByIdAPI(id) {
  return http.subCategoryService.get(`getServiceSubCategory?parentId=${id}`);
}
