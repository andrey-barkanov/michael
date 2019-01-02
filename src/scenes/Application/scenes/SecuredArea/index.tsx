import * as React from 'react';
import * as service from 'service';

interface PropsShape {
  location: any;
  onLogout: () => any;
}

interface StateShape {
  overview: any;
}

export default class SecuredArea extends React.Component<PropsShape> {
  state: StateShape = {
    overview: null,
  }

  async componentDidMount() {
    const data = await service.getOverview();
    this.setState({ overview: data.data });
  }

  render() {
    const { overview } = this.state;

    return <div>
      Hi, version is: {overview ? overview.rabbitmq_version : '-'}
      <button onClick={this.props.onLogout}>Exit</button>
    </div>;
  }
}
