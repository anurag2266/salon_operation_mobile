import http from '../http';

export async function verifyPhoneAPI(data) {
  return http.userService.post('checkMobile', data);
}
export async function verifyOTPAPI(data) {
  return http.userService.post('verifyOtp', data);
}
export async function loginWithPasswordAPI(data) {
  return http.userService.post('login', data);
}
export async function updateUserInfoAPI(data) {
  return http.userService.put('updateUserInfo', data);
}
export async function updateMpinAPI(data) {
  return http.userService.put('updateUserMpin', data);
}
export async function loginWithMpinAPI(data) {
  return http.userService.post('loginWithMpin', data);
}
export async function sendOTPAPI(phoneNumber) {
  return http.userService.get(
    `sendOtpToRegisteredUser?primaryPhone=${phoneNumber}`,
  );
}
export async function changePasswordAPI(data) {
  return http.userService.put('updateUserPassword', data);
}
export async function getUserDetailsAPI() {
  return http.userService.get('getUserDetails');
}
export async function updateUserProfileAPI(data) {
  return http.userService.put('UpdateUser', data);
}
export async function updateUserPasswordAPI(data) {
  return http.userService.put('updateUserPasswordMobile', data);
}
