import http from '../http';

export async function getAllMembershipData(data) {
  return http.membershipData.get('getAllMembershipData', data);
}
