const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');
const inputs = document.querySelectorAll('input');

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkInputRequired(input) {
  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} is Required`);
  } else {
    showSuccess(input);
  }
}

function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

function checkPasswordMatch(input) {
  if (input.value.trim() !== password.value.trim()) {
    showError(input, 'Passwords do not match');
  } else {
    showSuccess(input);
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkEmail(email);
  checkPasswordMatch(confirmPassword);
});

inputs.forEach((input) => {
  input.addEventListener('change', function (e) {
    checkInputRequired(e.target);
    if (e.target.name === 'email') {
      checkEmail(e.target);
    }
    if (e.target.name === 'password2') {
      checkPasswordMatch(e.target);
    }
  });
});
//Wrong way of doing it with if statements.

// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   if (username.value === '') {
//     showError(username, 'Username is required');
//   } else {
//     showSuccess(username);
//   }

//   if (email.value === '') {
//     showError(email, 'Email is required');
//   } else if (!isValidEmail(email.value)) {
//     showError(email, 'Email is required');
//   } else {
//     showSuccess(email);
//   }

//   if (password.value === '') {
//     showError(password, 'Password is required');
//   } else {
//     showSuccess(password);
//   }
//   if (confirmPassword.value === '') {
//     showError(confirmPassword, 'Confirming Password is required');
//   } else if (confirmPassword.value !== password.value) {
//     showError(confirmPassword, 'Passwords do not match');
//   } else {
//     showSuccess(confirmPassword);
//   }
// });
