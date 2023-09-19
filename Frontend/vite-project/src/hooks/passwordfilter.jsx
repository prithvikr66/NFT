import React, { Component } from 'react';
import Pwdguide from './pwdguide';
class PasswordForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordStrength: '',
    };
  }

  handlePasswordChange = (e) => {
    const password = e.target.value;
    const passwordStrength = this.calculatePasswordStrength(password);

    this.setState({
      password,
      passwordStrength,
    });
  };

  calculatePasswordStrength = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    ) {
      return 'Very Strong';
    } else if (
      password.length >= minLength &&
      ((hasUppercase && hasLowercase) ||
        (hasUppercase && hasDigit) ||
        (hasLowercase && hasDigit) ||
        (hasSpecialChar && hasDigit))
    ) {
      return 'Strong';
    } else if (password.length >= minLength && (hasUppercase || hasLowercase)) {
      return 'Moderate';
    } else {
      return 'Weak';
    }
  };

  render() {
    return (
      <div>

        <div>
        <label
              htmlFor="password"
              className="mb-1 text-xl block text-sm font-medium text-gray-600">
                Password
        </label>
        
          <input className='w-full px-4 py-2 border rounded-lg focus:outline-none  focus:border-blue-500'
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className='flex justify-between mt-2'>
          <p>Password Strength: {this.state.passwordStrength}</p>
          <Pwdguide ></Pwdguide>
        </div>
      </div>
    );
  }
}

export default PasswordForm;
