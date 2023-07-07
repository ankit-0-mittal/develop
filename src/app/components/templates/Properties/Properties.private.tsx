/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { useCurrentWidth } from 'react-breakpoints-hook';
import {
  PropertyForm,
  PropertyList,
  UploadCsv,
} from 'app/components/organisms';
import { ComponentFilterHeader } from 'app/components/molecules';
import { Row, Col, GoogleMap } from 'app/components/atoms';
import { PropertyListItem } from 'utils/types/property';
import { sizes } from 'styles/media';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { checkCreatePermission, checkUpdatePermission } from 'utils/constants';
import { clearcsv } from 'redux/actions';
import { history } from 'utils/history';
import { actionIds } from 'redux/types/actionsType';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const INDIA_CENTER = { lat: 59.95, lng: 30.33 };

export function Propertiesprivate(props) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  let params = queryString.parse(location.search);
  const [searchname, setSearchname] = useState('');
  const [searchaddress, setSearchaddress] = useState('');
  const [searchbk, setSearchbk] = useState('');
  const [searchstatus, setSearchStatus] = useState('');
  const [searchptype, setSearchptype] = useState([]);
  const [filterbox, filterboxOpen] = useState(false);
  const data = useSelector((state: any) => {
    return state;
  });
  const user = useMemo(() => data.userReducer.user, [data.userReducer.user]);
  const [viewType, setViewType] = useState('list');
  const [uploadcsvvisble, setUploadvisble] = useState(false);
  const [properties, setProperties] = useState<Array<PropertyListItem>>([]);
  const [permissions, setPermissions] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const [csvloading, setCsvLoading] = useState(false);
  const [searchEqaroId, setSearchEqaroId] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const onShow = show => setVisible(show);
  const onOpen = () => filterboxOpen(true);
  const onClose = () => filterboxOpen(false);
  const onViewTypeSelected = (type = 'list') => {
    setViewType(type);
  };
  const handleCsvDownload = () => {
    setCsvLoading(true);
    dispatch({
      type: actionIds.DOWNLOAD_CSV,
      payload: {
        page: 1,
        filters: `sortBy=_id:desc`,
        name: searchname,
        searchaddress,
        searchbk,
        searchptype,
        searchstatus,
        landlordId: params.landlordId ? params.landlordId : '',
        searchEqaroId: searchEqaroId,
      },
    });
  };

  useEffect(() => {
    setCsvLoading(false);
    if (data.propertyReducer.downloadcsv !== null) {
      const url = window.URL.createObjectURL(
        new Blob([data.propertyReducer.downloadcsv]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `properties.csv`);
      document.body.appendChild(link);
      link.click();
      dispatch({ type: actionIds.EMPTY_CSV });
    }
  }, [data.propertyReducer.downloadcsv]);

  const handleSearchvalues = (e, b, k, l, eqaroId) => {
    setSearchaddress(e);
    setSearchptype(b);
    setSearchbk(k);
    setSearchStatus(l);
    setSearchEqaroId(eqaroId);
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

  useEffect(() => {
    if (window.location.href.includes('/#addnew')) onShow(true);
    else onShow(false);

    history.replace({
      pathname: '/home/properties',
    });
  }, []);

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

  useEffect(() => {
    if (data.propertyReducer.permissions)
      setPermissions(data.propertyReducer.permissions);
  }, [data.propertyReducer.permissions]);
  useEffect(() => {
    setLoading(false);

    if (data.docReducer.csv !== null) {
      if (!data.docReducer.csv.error) {
        message.success('Uploaded Succesfully');
        setUploadvisble(false);
        setLoading(false);
        dispatch(clearcsv());

        dispatch({
          type: actionIds.REFRESH_PROPERTY,
        });
      }
    }
  }, [data.docReducer.csv, dispatch]);

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
    <div style={{ height: '80vh' }}>
      <ComponentFilterHeader
        search={true}
        uploadCsv={true}
        onSearch={handleSearch}
        subtitle=""
        count={totalCount}
        permissions={permissions}
        handleCsvUpload={handleCsvBtnClick}
        handleCsvDownload={handleCsvDownload}
        loading={csvloading}
        title="Properties"
        searchvalue={searchname}
        btnTitle="+ Add Property"
        filterbox={filterbox}
        onopen={onOpen}
        onclose={onClose}
        onBtnClicked={() => onShow(true)}
        handleSearchValues={handleSearchvalues}
      />
      <Row style={{ height: '100%' }}>
        <Col span={span}>
          <PropertyList
            viewType={viewType}
            properties={properties}
            setTotalCount={setTotalCount}
            setProperties={setProperties}
            filterprop={searchname}
            searchadd={searchaddress}
            searchptype={searchptype}
            searchbr={searchbk}
            searchstatus={searchstatus}
            landlordId={params.landlordId ? params.landlordId : ''}
            searchEqaroId={searchEqaroId}
          />
        </Col>
        {viewType === 'map' && (
          <Col sm={24} md={12} lg={12} style={{ paddingLeft: margin }}>
            <GoogleMap
              defaultZoom={10}
              defaultCenter={INDIA_CENTER}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, [])}
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
      {checkCreatePermission(permissions) &&
        checkUpdatePermission(permissions) && (
          <PropertyForm visible={visible} onShow={onShow} />
        )}
      {/* {properties.length > 0 && (
        <div style={{ position: 'absolute', right: '4.8rem', bottom: '4rem' }}>
          <MapViewButton onSelect={onViewTypeSelected} value="list" />
        </div>
      )} */}
      <UploadCsv
        type="property"
        onCancel={handleUploadCancel}
        visible={uploadcsvvisble}
        loading={loading}
        setLoading={handleLoading}
      />
    </div>
  );
}
