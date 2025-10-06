const form = document.getElementById("signupForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const emailError = document.getElementById("emailError");
const confirmError = document.getElementById("confirmError");
const successMsg = document.getElementById("successMsg");
const togglePassword = document.getElementById("togglePassword");

const rules = {
  length: document.getElementById("ruleLength"),
  upper: document.getElementById("ruleUpper"),
  lower: document.getElementById("ruleLower"),
  digit: document.getElementById("ruleDigit"),
  special: document.getElementById("ruleSpecial"),
};

togglePassword.addEventListener("click", () => {
  const type = password.type === "password" ? "text" : "password";
  password.type = type;
  confirmPassword.type = type;
  togglePassword.textContent = type === "password" ? "Show" : "Hide";
});

const patterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  digit: /[0-9]/,
  special: /[!@#$%]/,
};

password.addEventListener("input", () => {
  const val = password.value;
  rules.length.className = val.length >= 8 ? "valid" : "invalid";
  rules.upper.className = patterns.upper.test(val) ? "valid" : "invalid";
  rules.lower.className = patterns.lower.test(val) ? "valid" : "invalid";
  rules.digit.className = patterns.digit.test(val) ? "valid" : "invalid";
  rules.special.className = patterns.special.test(val) ? "valid" : "invalid";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  emailError.textContent = "";
  confirmError.textContent = "";
  successMsg.textContent = "";

  if (!patterns.email.test(email.value.trim())) {
    emailError.textContent = "Please enter a valid email.";
    valid = false;
  }

  const val = password.value;

  if (
    val.length < 8 ||
    !patterns.upper.test(val) ||
    !patterns.lower.test(val) ||
    !patterns.digit.test(val) ||
    !patterns.special.test(val)
  ) {
    valid = false;
  }

  if (password.value !== confirmPassword.value) {
    confirmError.textContent = "Passwords do not match.";
    valid = false;
  }

  if (valid) {
    successMsg.textContent = "Sign-up successful!";
    form.reset();
    Object.values(rules).forEach((rule) => (rule.className = "invalid"));
  }
});
