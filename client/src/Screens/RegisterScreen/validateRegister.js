let emailRegex = new RegExp(/[^@]+@[^.]+\..+/);
let nameRegex = new RegExp(/^[A-Za-z]/);
let passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
export const registerValidate = (
  name,
  email,
  password,
  confirmPassword,
  isInvalid,
  setIsInvalid
) => {
  let obj = { ...isInvalid };
  let num = 0;
  if (!name || !nameRegex.test(name)) {
    obj.name = true;
    num++;
  }
  if (!email || !emailRegex.test(email)) {
    num++;
    obj.email = true;
  }
  if (!password || !passRegex.test(password)) {
    num++;
    obj.password = true;
  }
  if (!confirmPassword || password !== confirmPassword) {
    num++;
    obj.confirmPassword = true;
  }
  setIsInvalid({ ...obj });
  if (num !== 0) {
    return false;
  } else {
    return true;
  }
};
