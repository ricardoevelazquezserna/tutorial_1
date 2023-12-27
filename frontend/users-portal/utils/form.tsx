export const validateMessages = {
  required: "Field is required.",
};

export const alphaFieldValidation = async (value: string) => {
  const pattern = "^[a-zA-Z ñÑáéíóúÁÉÍÓÚ]+$";
  const regex = new RegExp(pattern);
  if (regex.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Only letters are allowed.'))
  }
}

export const alphaNumericFieldValidation = async (value: string) => {
  const pattern = "^[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚ]+$";
  const regex = new RegExp(pattern);
  if (regex.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Only letters and numbers are allowed.'))
  }
}

export const emailFieldValidation = async (value: string) => {
  const pattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  const regex = new RegExp(pattern);
  if (regex.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('The format is not valid.'))
  }
}