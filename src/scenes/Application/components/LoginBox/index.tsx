import * as React from 'react';

const style = require('./style.sass');

interface PropsShape {
  onLogin: (login: string, password: string) => any;
}

export default class LoginBox extends React.Component<PropsShape> {
  state = {
    login: '',
    password: '',
  };

  onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ login: event.target.value });
  }

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  }

  onSubmit = () => {
    const { login, password } = this.state;
    this.props.onLogin(login, password);
  }

  render() {
    const { login, password } = this.state;

    return (<div className={style.loginBox}>
      <div className={style.form}>
        <input
          autoFocus
          placeholder="Login"
          value={login}
          onChange={this.onLoginChange}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={this.onPasswordChange}
          type="password"
        />
        <button
          disabled={!login || !password}
          onClick={this.onSubmit}
        >
          Enter
        </button>
      </div>
    </div>);
  }
}
