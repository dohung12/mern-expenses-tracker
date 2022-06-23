function checkPermissions(requestUser, resourceUserId) {
  return requestUser === resourceUserId.toString();
}
module.exports = checkPermissions;
