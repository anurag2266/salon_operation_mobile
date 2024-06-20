import http from '../http';

export async function addInventoryMaster(data) {
  return http.inventoryService.post('addInventoryMaster', data);
}

export async function getInventoryMaster(data) {
  return http.inventoryService.get('getInventoryMasters',{params:data});
}
