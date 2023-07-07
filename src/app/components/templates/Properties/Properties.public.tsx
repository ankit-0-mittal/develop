import { useState } from 'react';
import { useCurrentWidth } from 'react-breakpoints-hook';
import { LoginModal, PropertyListpublic } from 'app/components/organisms';
import { media } from 'styles/media';
import styled from 'styled-components';
import { ComponentFilterHeaderpublic } from 'app/components/molecules';
import { Row, Col, GoogleMap, Button } from 'app/components/atoms';
import { PropertyListItem } from 'utils/types/property';
import { sizes } from 'styles/media';
import { Image } from 'antd';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const INDIA_CENTER = { lat: 59.95, lng: 30.33 };

export function Propertiespublic() {
  const [visible, setVisible] = useState(false);
  const [logvisible, setLogvisible] = useState(false);

  const [searchname, setSearchname] = useState('');
  const [searchaddress, setSearchaddress] = useState('');
  const [searchbk, setSearchbk] = useState('');
  const [searchptype, setSearchptype] = useState([]);
  const [filterbox, filterboxOpen] = useState(false);
  const location = useLocation();

  let params = queryString.parse(location.search);

  const { landlordId = '', status = '' }: any = params;

  console.log(landlordId, status);

  const [viewType, setViewType] = useState('list');
  const [uploadcsvvisble, setUploadvisble] = useState(false);
  const [properties, setProperties] = useState<Array<PropertyListItem>>([]);
  const [permissions, setPermissions] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  const onShow = show => setVisible(show);
  const onOpen = () => filterboxOpen(true);
  const onClose = () => filterboxOpen(false);
  const onViewTypeSelected = (type = 'list') => {
    setViewType(type);
  };
  const onOpenlog = () => {
    setLogvisible(true);
  };
  const onCloselog = () => {
    setLogvisible(false);
  };
  const handleSearchvalues = (e, b, k) => {
    setSearchaddress(e);
    setSearchptype(b);
    setSearchbk(k);
  };

  const width = useCurrentWidth();

  const span = viewType === 'list' ? 24 : width <= sizes.medium ? 0 : 12;
  const margin = width <= sizes.medium ? 0 : '2.4rem';

  const handleCsvBtnClick = () => setUploadvisble(true);

  const handleLoading = bool => {
    setLoading(bool);
  };

  const handleUploadCancel = () => setUploadvisble(false);

  const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach(place => {
      bounds.extend(
        new maps.LatLng(
          place.geometry.location.lat,
          place.geometry.location.lng,
        ),
      );
    });
    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
    var geocoder = new maps.Geocoder();
    codeAddress(geocoder, map, maps);
  };

  function codeAddress(geocoder, map, maps) {
    geocoder.geocode({ address: '' }, function (results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  const handleSearch = e => {
    setSearchname(e);
  };
  return (
    <>
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <Div1>
          <Image
            width={'12rem'}
            style={{ marginLeft: '15rem' }}
            preview={false}
            src={require('../../../assets/logo-light.svg').default}
            className="logo-menu"
          />{' '}
          <Button
            type="primary"
            style={{
              padding: '1.2rem 1.8rem 1.2rem 1.8rem',
              width: '10.6rem',
              height: '4.2rem',
              fontSize: '1rem',
              borderRadius: '2px',
            }}
            onClick={onOpenlog}
          >
            Start now
          </Button>
        </Div1>
        <ResponsiveDiv>
          <ComponentFilterHeaderpublic
            search={true}
            uploadCsv={true}
            onSearch={handleSearch}
            permissions={permissions}
            handleCsvUpload={handleCsvBtnClick}
            title="Properties"
            searchvalue={searchname}
            subtitle="Checkout all the properties registered on Eqaro"
            filterbox={filterbox}
            onopen={onOpen}
            onclose={onClose}
            onBtnClicked={onOpenlog}
            handleSearchValues={handleSearchvalues}
            btnTitle={''}
          />
          <Row>
            <Col span={span}>
              <PropertyListpublic
                viewType={viewType}
                landlordId={landlordId}
                properties={properties}
                setProperties={setProperties}
                filterprop={searchname}
                searchstatus={status}
                searchadd={searchaddress}
                searchptype={searchptype}
                searchbr={searchbk}
              />
            </Col>
            {viewType === 'map' && (
              <Col sm={24} md={12} lg={12} style={{ paddingLeft: margin }}>
                <GoogleMap
                  defaultZoom={10}
                  defaultCenter={INDIA_CENTER}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) =>
                    apiIsLoaded(map, maps, [])
                  }
                >
                  {/* {properties.map(({ id, loc = ['', ''] }) => (
                <Marker
                  key={id}
                  lat={loc[0]}
                  lng={loc[1]}
                  show={true}
                  place={id}
                />
              ))} */}
                </GoogleMap>
              </Col>
            )}
          </Row>
          {/* {properties.length > 0 && (
            <div
              style={{ position: 'absolute', right: '4.8rem', bottom: '4rem' }}
            >
              <MapViewButton onSelect={onViewTypeSelected} value="list" />
            </div>
          )} */}
        </ResponsiveDiv>
        <Div2>
          <Span2>Ready to get started?</Span2>
          <Span3>
            All it takes is 3 minutes! CLick on any property to buy a bond
          </Span3>
          {/* <Button
            type="primary"
            style={{
              padding: '1.2rem 1.8rem 1.2rem 1.8rem',
              width: '10.6rem',
              height: '4.2rem',
              fontSize: '1rem',
              borderRadius: '2px',
              marginTop: '3rem',
            }}
            onClick={onOpenlog}
          >
            Get Started
          </Button> */}
        </Div2>
        <Div3 style={{ fontSize: '1.2rem', color: '#C3CBCD' }}>
          {' '}
          © Eqaro. All rights reserved.
        </Div3>
      </div>
      <LoginModal visible={logvisible} onCancel={onCloselog} />
    </>
  );
}

const Div1 = styled.div`
  height: 8.8rem;
  width: auto;
  background: rgba(49, 170, 183, 0.06);
  display: flex;
  flex-wrap: wrap;
  padding: 0rem 10rem;
  justify-content: space-between;
  align-items: center;
  ${media.mobile`padding: 0rem 2rem`};
  ${media.small`padding: 0rem 2rem`};
  ${media.medium`padding: 0rem 10rem`};
  ${media.large`padding: 0rem 10rem`};
  ${media.xlarge`padding: 0rem 10rem`};
`;

const Div2 = styled.div`
  height: 34.8rem;
  width: auto;
  background: rgba(49, 170, 183, 0.06);
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div3 = styled.div`
  height: 6.4rem;
  width: auto;
  background: #373f41;
  color: white !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Div4 = styled.div``;

const Span2 = styled.p`
 
  height: 40px;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #373f41;
  text-transform:capital
  font-family: Mulish;
`;
const Span3 = styled.p`
  height: 44px;
  width:24.5rem;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #737b7d;
  text-transform:capital
  font-family: Mulish;
`;

const ResponsiveDiv = styled.div`
  ${media.mobile`padding: 5rem 2rem`};
  ${media.small`padding: 5rem 2rem`};
  ${media.medium`padding: 5rem 15rem 10rem 15rem`};
  ${media.large`padding: 5rem 15rem 10rem 15rem`};
  ${media.xlarge`padding: 5rem 15rem 10rem 15rem`};
`;
