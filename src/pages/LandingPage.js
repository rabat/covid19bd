import React from 'react';
import BangadeshMap from '../components/BangladeshMap';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex flex-wrap justify-center">
        <div className="w-2/3 text-center" style={{ height: '100vh' }}>
          <BangadeshMap />
        </div>
      </div>
    );
  }
}

export default LandingPage;
