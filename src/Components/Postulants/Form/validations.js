const validatePostulant = (body) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!body.firstName) {
    return 'firstName is wrong or missing';
  }
  if (!body.lastName) {
    return 'lastName is wrong or missing';
  }
  if (!body.email || !body.email.match(emailRegex)) {
    return 'email should contain  "@" and "."';
  }
  if (!body.password) {
    return 'password is wrong or missing';
  }
  if (!body.contactRange || !body.contactRange.from || !body.contactRange.to) {
    return 'contactRange is wrong or missing';
  }
  if (!body.address) {
    return 'address is wrong or missing';
  }
  if (
    !body.birthday ||
    !body.birthday.match(
      /(^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([0-5][0-9]):([0-5][0-9])((:[0-5][0-9].\d{3}Z)?)$)|(^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$)/
    )
  ) {
    return 'birthday format should be YYYY-MM-DD';
  }
  if (!body.available || typeof body.available !== 'boolean') {
    return 'available is wrong or missing';
  }
  if (!body.phone) {
    return 'phone is wrong or missing';
  }
  return false;
};
module.exports = validatePostulant;
