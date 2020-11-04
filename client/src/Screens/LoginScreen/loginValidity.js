let emailRegex = new RegExp(/[^@]+@[^.]+\..+/);
// let nameRegex = new RegExp(/^[A-Za-z]/);
export const validateForm = (email, password, isInvalid, setIsInvalid) => {
  let obj = { ...isInvalid };
  let num = 0;
  if (!email || !emailRegex.test(email)) {
    num++;
    obj.email = true;
  }
  if (!password) {
    num++;
    obj.password = true;
  }
  setIsInvalid({ ...obj });
  if (num !== 0) {
    return false;
  } else {
    return true;
  }
};
