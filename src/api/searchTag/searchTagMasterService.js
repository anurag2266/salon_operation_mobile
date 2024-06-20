import http from '../http';

export async function getAllServiceTag() {
  return http.searchTagMaster.get('getServicetag');
}
