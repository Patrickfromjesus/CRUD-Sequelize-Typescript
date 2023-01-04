function validateFields (email, password) {
  const validate = [];
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  (emailRegex.test(email)) ? validate.push(true) : validate.push(false);
  (password.length > 7) ? validate.push(true) : validate.push(false);
  return !validate.every((item) => item);
};

function validateName (name, email, password) {
  const validate = [];
  validate.push(!validateFields(email, password));
  name !== '' ? validate.push(true) : validate.push(false);
  return !validate.every((e) => e);
}

export {
  validateFields,
  validateName,
};
