import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

function createMapOptions(maps) {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
      style: maps.ZoomControlStyle.SMALL,
    },
    streetView: true,
    fullscreenControl: false,
    mapTypeControl: false,
  };
}

const Wrapper = styled.main`
  width: 100%;
  margin-top: 2.4rem;
  padding: 0.1rem;
  border: 1px solid rgba(167, 177, 198, 0.2);
  height: 78vh;
`;

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      options={createMapOptions}
      fullScreen
      bootstrapURLKeys={{
        key: 'AIzaSyCaCb4fqcHlh5R0CtxygBpG-f-Khp0ksEE',
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </Wrapper>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
