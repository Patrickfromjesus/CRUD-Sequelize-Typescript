export default function validateFields (name, email, password) {
  const validate = [];
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  (name !== '') ? validate.push(true) : validate.push(false);
  (emailRegex.test(email)) ? validate.push(true) : validate.push(false);
  (password.length > 7) ? validate.push(true) : validate.push(false);
  return !validate.every((item) => item);
};
