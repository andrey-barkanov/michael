import * as React from 'react';
import LoginBox from './components/LoginBox';
import SecuredArea from './scenes/SecuredArea';
import { withRouter } from 'react-router';
import { User } from 'types';
import * as base64 from 'base-64';
import * as service from 'service';
import * as dateFns from 'date-fns';

const COOKIES = require('universal-cookie');

interface StateShape {
  user: User;
  location: any;
}

class Application extends React.Component {
  state: StateShape = {
    user: null,
    location: null,
  };

  async componentDidMount() {
    try {
      const data = await service.getCurrentUser();
      this.setState({ user: data.data });
    } catch (error) {
      console.log(error);
    }
  }

  logIn = async (login: string, password: string) => {
    const cookies = new COOKIES();

    try {
      cookies.set(
        'auth',
        base64.encode(`${login}:${password}`),
        { expires: dateFns.addHours(new Date(), 8) });

      const data = await service.getCurrentUser();
      this.setState({ user: data.data });
    } catch {
      cookies.remove('auth');
      alert('Invalid credentials.');
    }
  }

  logOut = () => {
    const cookies = new COOKIES();
    cookies.remove('auth');
    this.setState({ user: null });
  }

  render() {
    const { user } = this.state;

    return (<div>
      {!user ?
        <LoginBox onLogin={this.logIn}/> :
        <SecuredArea
          location={location}
          onLogout={this.logOut}
        />}
    </div>);
  }
}

export default withRouter<any>(Application);
