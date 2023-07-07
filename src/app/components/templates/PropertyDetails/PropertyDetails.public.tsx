import React, { useState, useEffect } from 'react';
import { Avatar, Skeleton, Empty } from 'antd';
import { Button, Card, Col, Row, Typography } from 'app/components/atoms';
import {
  BreadCrumbTitle,
  ComponentDetailHeader,
} from 'app/components/molecules';
import { Gallery, LoginModal } from 'app/components/organisms';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';
import map from '../../../assets/maps.svg';
import {
  convertToCurrency,
  getAssetFromUrl,
  getInitialsForAvatar,
} from 'utils/constants';
import { Property } from 'utils/types/property';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'antd';
import { get } from 'lodash';
import { getsingleproperty } from 'redux/actions';
import { CheckCircleFilled } from '@ant-design/icons';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

export function PropertyDetailspublic() {
  const [logvisible, setLogvisible] = useState(false);
  const [permissions, setPermissions] = useState<Array<string>>([]);
  const [property, setProperty] = useState<Property>();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: any) => {
    return state;
  });
  const location = useLocation();

  const { id }: any = useParams();
  const onOpenlog = () => {
    setLogvisible(true);
  };
  const onCloselog = () => {
    setLogvisible(false);
  };

  useEffect(() => {
    if (data.propertyReducer.permissions)
      setPermissions(data.propertyReducer.permissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.propertyReducer.permissions]);

  const nothing = () => {};

  useEffect(() => {
    let params = queryString.parse(location.search);
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) dispatch(getsingleproperty({ id: id }));
    else {
      if (params.externalId) {
        history.push(
          `/home/properties/details/${id}?externalId=${params.externalId}`,
        );
      } else history.push(`/home/properties/details/${id}`);
    }
  }, []);

  useEffect(() => {
    if (data.propertyReducer.singleproperty !== null) {
      setProperty(data.propertyReducer.singleproperty);
    }
  }, [data.propertyReducer.singleproperty]);

  const addressString = `${get(property, 'propertyAddress.house')}, ${get(
    property,
    'propertyAddress.locality',
  )},
   ${get(property, 'propertyAddress.street')}, ${get(
    property,
    'propertyAddress.city',
  )},
    ${get(property, 'propertyAddress.state')}, ${get(
    property,
    'propertyAddress.pin',
  )}`;

  const getCrumbs = () => {
    return [
      {
        name: 'Properties',
        link: '/home/properties',
      },
      {
        name: 'Details',
      },
    ];
  };

  const renderRent = (
    <HorizontalDiv>
      <Typography.Title level={3}>{`${convertToCurrency(
        get(property, 'expectedRent'),
      )}`}</Typography.Title>
      <MonthText level={5}>/month</MonthText>
    </HorizontalDiv>
  );

  const renderMainButton = () => {
    return (
      <FullWidthBtn onClick={onOpenlog} type="primary">
        Request for bond
      </FullWidthBtn>
    );
  };

  /** Next, checking if the user already requested for a bond,
   *  if property is vacant */

  const renderRentCard = (
    <PropertyCard
      style={{ borderTop: `0.4rem solid ${themeColors.accent}` }}
      title={renderRent}
    >
      <Row>
        <Col sm={24} md={12} lg={12}>
          <div>
            <HeadText>Bond Value</HeadText>
            <ValueText level={5}>{`${convertToCurrency(
              get(property, 'expectedBondValue'),
            )}`}</ValueText>
          </div>
        </Col>
        <Col sm={24} md={12} lg={12}>
          <HeadText>Advance Rent</HeadText>
          <ValueText level={5}>
            {`${convertToCurrency(get(property, 'expectedAdvanceRent'))}`}
          </ValueText>
        </Col>
        <Col span={24} style={{ marginTop: '3.2rem' }}>
          <div style={{ marginBottom: '1.6rem' }}>{renderMainButton()}</div>
        </Col>
      </Row>
    </PropertyCard>
  );

  const openInMap = () => {
    window.open(`http://maps.google.com/?q=${addressString}'`, '_a');
  };

  return (
    <>
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <Div1>
          <Image
            style={{ width: 'auto' }}
            preview={false}
            src={require('../../../assets/logo.svg').default}
            className="logo-menu"
          />{' '}
          <Div4>
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
          </Div4>
        </Div1>
        <div style={{ padding: '2.4rem' }}>
          <BreadCrumbTitle items={getCrumbs()} />
          {property ? (
            <div>
              <SectionDiv>
                <ComponentDetailHeader
                  module="Property"
                  permissions={permissions}
                  title={property.name}
                  subtitle={`${property.propertyAddress?.city}, ${property.propertyAddress?.state}`}
                  btnTitle="Edit Details"
                  deleteLoading={false}
                  onBtnClicked={nothing}
                  onDeleteBtnClicked={nothing}
                />
              </SectionDiv>
              <div>
                <SectionDiv>
                  <Gallery images={property.propertyImages} />
                </SectionDiv>
                <SectionDiv>
                  <Typography.Title level={4}>
                    {`${property.name} owned by ${property.ownerFullName}`}
                  </Typography.Title>
                </SectionDiv>
                <Row gutter={[24, 24]}>
                  <Col sm={24} md={16} lg={16}>
                    <SectionDiv className="subsection">
                      <Typography.Title
                        level={5}
                        style={{ marginBottom: '2.4rem' }}
                      >
                        PROPERTY DETAILS
                      </Typography.Title>
                      <Row>
                        <Col sm={24} md={8} lg={8}>
                          <div>
                            <HeadText>Property Category</HeadText>
                            <ValueText level={5}>
                              {property.propertyCategory}
                            </ValueText>
                          </div>
                        </Col>
                        <Col sm={24} md={8} lg={8}>
                          <div>
                            <HeadText>Property Type</HeadText>
                            <ValueText level={5}>
                              {property.propertyType}
                            </ValueText>
                          </div>
                        </Col>
                        <Col sm={24} md={8} lg={8}>
                          <HeadText>No. of Bedrooms</HeadText>
                          <ValueText level={5}>
                            {`${property.No_of_Bedrooms}`}
                          </ValueText>
                        </Col>
                        <Col
                          sm={24}
                          md={8}
                          lg={8}
                          style={{ marginTop: '0.8rem' }}
                        >
                          <HeadText>No. of Restrooms</HeadText>
                          <ValueText level={5}>
                            {`${property.noOfBathrooms}`}
                          </ValueText>
                        </Col>
                        <Col
                          sm={24}
                          md={8}
                          lg={8}
                          style={{ marginTop: '0.8rem' }}
                        >
                          <HeadText>Age of property</HeadText>
                          <ValueText level={5}>
                            {`${property.propertyAge} years`}
                          </ValueText>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: '1.6rem' }}>
                        {property.servantRoom ? (
                          <Col sm={24} md={8} lg={8}>
                            <ValueText level={5}>
                              <CheckCircleFilled
                                style={{
                                  color: 'green',
                                  fontSize: '2rem',
                                  margin: '0 0.5rem 0rem 0',
                                }}
                              />
                              Servant Room
                            </ValueText>
                          </Col>
                        ) : (
                          ''
                        )}
                        {property.studyRoom ? (
                          <Col sm={24} md={8} lg={8}>
                            <ValueText level={5}>
                              <CheckCircleFilled
                                style={{
                                  color: 'green',
                                  fontSize: '2rem',
                                  margin: '0 0.5rem 0rem 0rem',
                                }}
                              />
                              Study Room
                            </ValueText>
                          </Col>
                        ) : (
                          ''
                        )}
                      </Row>
                    </SectionDiv>
                    <SectionDiv>
                      <SectionDiv className="subsection">
                        <Typography.Title
                          level={5}
                          style={{ marginBottom: '2.4rem' }}
                        >
                          AMENITIES
                        </Typography.Title>
                        <Row>
                          {property.amenities &&
                          property.amenities.length > 0 ? (
                            property.amenities.map((x, i) => (
                              <Col sm={24} md={6} lg={6} key={i}>
                                <HorizontalDiv>
                                  <Image
                                    preview={false}
                                    style={{
                                      marginBottom: '0.5rem',
                                      marginRight: '1rem',
                                      width: '1.8rem',
                                      height: '1.8rem',
                                    }}
                                    src={getAssetFromUrl(
                                      `${x.replace(' ', '-')}.svg`,
                                    )}
                                  />
                                  <ValueText level={5}>{x}</ValueText>
                                </HorizontalDiv>
                              </Col>
                            ))
                          ) : (
                            <div
                              style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Empty />
                            </div>
                          )}
                        </Row>
                      </SectionDiv>
                    </SectionDiv>
                    <SectionDiv className="subsection">
                      <Typography.Title
                        level={5}
                        style={{ marginBottom: '2.4rem' }}
                      >
                        ADDRESS DETAILS
                      </Typography.Title>
                      <Row>
                        <Col span={24}>
                          <div>
                            <HeadText>Address</HeadText>
                            <ValueText level={5}>{addressString}</ValueText>
                          </div>
                        </Col>
                        <Col span={24}>
                          <SectionDiv>
                            <HeadText>Directions</HeadText>
                            <MapDiv>
                              <Button onClick={openInMap} type="default">
                                See on map
                              </Button>
                            </MapDiv>
                          </SectionDiv>
                        </Col>
                      </Row>
                    </SectionDiv>
                    <SectionDiv className="subsection">
                      <Typography.Title
                        level={5}
                        style={{ marginBottom: '2.4rem' }}
                      >
                        OWNER
                      </Typography.Title>
                      <HorizontalDiv>
                        <Avatar size={56}>
                          {getInitialsForAvatar(property.ownerFullName)}
                        </Avatar>
                        <ValueText
                          level={5}
                          style={{
                            marginLeft: '1.6rem',
                          }}
                        >
                          {property.ownerFullName}
                        </ValueText>
                      </HorizontalDiv>
                    </SectionDiv>
                  </Col>
                  <Col sm={24} md={8} lg={8}>
                    <SectionDiv>{renderRentCard}</SectionDiv>
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            <Skeleton active />
          )}
        </div>
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
      <LoginModal visible={logvisible} onCancel={onCloselog} id={id} />
    </>
  );
}

const SectionDiv = styled.div`
  margin-top: 2.4rem;
  &.subsection {
    margin: 2.4rem 0rem 0rem 0rem;
    border-radius: 4px;
    padding: 1.6rem 2.4rem;
    border: 1px solid rgba(167, 177, 198, 0.3);
  }
`;

const MapDiv = styled.div`
  width: 100%;
  height: 18rem;
  margin-top: 2.4rem;
  background: url(${map});
  display: flex;
  align-items: center;
  justify-content: center;

  & .ant-btn,
  & .ant-btn:not(:disabled) {
    border-color: ${themeColors.primaryButton};
    color: ${themeColors.primaryButton};
    background-color: white;
  }
`;

const PropertyCard = styled(Card)`
  border-radius: 4px;
  box-shadow: 0px 1px 16px rgba(18, 27, 33, 0.1);

  & .ant-card-body {
    padding: 2.4rem;
  }

  & .ant-card-head {
    padding: 2.4rem 2.4rem 0rem 2.4rem;
    & .ant-card-head-title {
      font-size: 1.2rem;
    }
  }
`;

const MonthText = styled(Typography.Title)`
  &.ant-typography {
    font-weight: normal;
    margin: 0rem 0rem 1.5rem 0.3rem;
  }
`;

const HeadText = styled(Typography.Text)`
  text-transform: uppercase;
  color: ${themeColors.textSecondary};
`;

const ValueText = styled(Typography.Title)`
  &.ant-typography {
    font-weight: normal;
  }
`;

const HorizontalDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const FullWidthBtn = styled(Button)`
  &.ant-btn {
    width: 100%;
    height: 4rem;
    justify-content: center;
  }
`;

const Div1 = styled.div`
  width: 100%;
  display: flex;
  padding: 1.6rem;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  height: 8.8rem;
  background: rgba(49, 170, 183, 0.06);
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
