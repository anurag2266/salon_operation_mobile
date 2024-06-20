import http from '../http';

export async function addMembershipData(data) {
  return http.membershipData.post('addMembershipData', data);
}
