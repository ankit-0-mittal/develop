/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from 'react';
import { Avatar, Skeleton } from 'antd';

import {
  InfoCircleOutlined,
  InfoCircleFilled,
  CheckCircleFilled,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'app/components/atoms';
import {
  BreadCrumbTitle,
  ComponentDetailHeader,
  InfoDialog,
} from 'app/components/molecules';
import {
  Gallery,
  PropertyForm,
  SharePropertyCard,
} from 'app/components/organisms';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';
import map from '../../../assets/maps.svg';
import { Image } from 'antd';
import {
  BOND_REQUEST_STATUS,
  BOND_REQUEST_TYPES,
  convertToCurrency,
  FORM_OPEN_STATE,
  getAssetFromUrl,
  getInitialsForAvatar,
  PAYMENT_TYPE,
  PropertyStatus,
  TenantStatus,
  USER_TYPES,
} from 'utils/constants';
import { Property } from 'utils/types/property';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionIds } from 'redux/types/actionsType';
import { get } from 'lodash';
import { getsingleproperty, getuserdetailsidemenu } from 'redux/actions';
import { CartPanel } from 'app/components/organisms';
import { Cart } from 'utils/types/product';
import { Bond } from 'utils/types/bond';
import { Empty } from 'antd';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const BUTTON_STATUSES = {
  BOND_OWN: 'BOND_OWN',
  PURCHASED: 'PURCHASED',
  OCCUPIED: 'OCCUPIED',
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  TRANSFER_REQUESTED: 'TRANSFER_REQUESTED',
  TRANSFER_ACCEPTED: 'TRANSFER_ACCEPTED',
  SHOW_TRANSFER: 'SHOW_TRANSFER',
  ELIGIBLE: 'ELIGIBLE',
  LOADING: 'LOADING',
  NONE: 'NONE',
};

export function PropertyDetailsprivate() {
  const [modalVisible, setModalVisible] = useState(false);
  const [occupiedBondModalVisible, setOccupiedBondModalVisible] =
    useState(false);

  const [shareCardVisible, setShareCardVisible] = useState(false);
  const [buttonStatus, setStatusBtton] = useState(BUTTON_STATUSES.LOADING);
  const [btnLoading, setBtnLoading] = useState(false);
  const [permissions, setPermissions] = useState<Array<string>>([]);
  const [tenant, setTenant] = useState();
  const [bond, setBond] = useState<Bond>();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [property, setProperty] = useState<Property>();
  const dispatch = useDispatch();
  const [noBondRequest, setNoBondRequests] = useState(0);
  const location = useLocation();
  let params = queryString.parse(location.search);

  const data = useSelector((state: any) => {
    return state;
  });
  const permissionheader = useMemo(
    () => data.propertyReducer.permissionsingleproperty,
    [data.propertyReducer.permissionsingleproperty],
  );
  const [pdfLoad, setPdfLoad] = useState(false);
  const history = useHistory();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.BUY_BOND);

  const user = useMemo(() => data.userReducer.user, [data.userReducer.user]);
  const isTenant = user?.userType === USER_TYPES.TENANT;
  const isLandlord = user?.userType === USER_TYPES.LANDLORD;
  const [checking, setChecking] = useState(false);
  const [bondRequest, setBondRequest] = useState<any>({});

  const refresh = () => {
    window.location = window.location.href.split('?')[0];
  };

  const onBondPurchaseSuccess = () => {
    onShow(false);
    refresh();
  };

  const [cartObject, setCartObject] = useState<Cart>({
    product: {
      bondAmount: 0,
      id: '',
      features: [],
      tenures: [1],
    },
    gst: 0,
    fee: 0,
    bondEffectiveDate: bondRequest?.bondEffectiveDate,
    externalRedirectLink: bondRequest?.externalRedirectLink,
    finalAmount: 0,
    tenure: 1,
  });

  const onShowCart = (show: boolean) => {
    setIsCartVisible(show);
  };

  const handleShareCardShow = () => {
    setShareCardVisible(false);
  };

  const handleShareClick = () => {
    setShareCardVisible(true);
  };

  const { id }: any = useParams();

  useEffect(() => {
    dispatch({
      type: actionIds.SINGLE_PROPERTY_PERMISSION,
      payload: id,
    });
  }, []);

  useEffect(() => {
    if (data.propertyReducer.permissions)
      setPermissions(data.propertyReducer.permissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.propertyReducer.permissions]);

  const handleEditBtnClick = () => {
    onShow(true);
  };
  const handleDeleteClick = () => {
    setModalVisible(true);
  };
  const handleDeleteConfirm = () => {
    setModalVisible(false);
    setDeleteLoading(true);
    dispatch({
      type: actionIds.DELETE_PROPERTY,
      id: id,
      history: history,
    });
  };
  const handleDeleteCancel = () => {
    setModalVisible(false);
  };

  const handleBondRequest = () => {
    setBtnLoading(true);
    dispatch({
      type: actionIds.REQUEST_BOND_CREATE,
      payload: {
        propertyId: id,
        externalId: params.externalId,
      },
    });
  };

  const handleTransferRequest = () => {
    setBtnLoading(true);
    dispatch({
      type: actionIds.REQUEST_BOND_CREATE,
      payload: {
        propertyId: id,
        oldPropertyId: bond?.propertyId,
        bondId: bond?.id,
        type: BOND_REQUEST_TYPES.TRANSFER_BOND,
      },
    });
  };

  const handleBuyBond = () => {
    setPaymentType(PAYMENT_TYPE.BUY_BOND);
    setBtnLoading(true);
    dispatch({
      type: actionIds.GET_PRODUCT_AMOUNT,
      payload: {
        bondAmount: property?.expectedBondValue,
        productId: property?.productId,
        tenure: 1,
      },
    });
  };
  const handleTransferBond = () => {
    setPaymentType(PAYMENT_TYPE.TRANSFER_BOND);
    onShowCart(true);
    setBtnLoading(true);
    dispatch({
      type: actionIds.GET_PRODUCT_AMOUNT,
      payload: {
        bondAmount: property?.expectedBondValue,
        productId: property?.productId,
        oldPropertyId: bond?.propertyId,
        tenure: 1,
      },
    });
  };

  const [visible, setVisible] = useState(false);
  const onShow = (show: boolean | ((prevState: boolean) => boolean)) => {
    setVisible(show);
  };

  useEffect(() => {
    setProperty(undefined);
    setBtnLoading(true);
    setIsCartVisible(false);
    dispatch(getsingleproperty({ id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (data.propertyReducer.singleproperty !== null) {
      setProperty(data.propertyReducer.singleproperty);
    }
  }, [data.propertyReducer.singleproperty]);

  React.useEffect(() => {
    setBtnLoading(false);
    if (data.productReducer.cart !== null) {
      let cart = { ...data.productReducer.cart };
      cart.bondEffectiveDate = bondRequest?.bondEffectiveDate;
      cart.externalRedirectLink = bondRequest?.externalRedirectLink;

      setCartObject(cart);
      setChecking(false);
      onShowCart(true);
    }
  }, [data.productReducer.cart, property, data.productReducer, bondRequest]);

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

  const handleBondDownload = (bondId = '') => {
    window.open(`/home/bond/pdf/${bondId}`, '_blank');
  };

  const renderMainButton = () => {
    switch (buttonStatus) {
      case BUTTON_STATUSES.BOND_OWN:
        return (
          <FullWidthBtn
            onClick={() => handleBondDownload(bond?.id)}
            type="primary"
            loading={btnLoading || pdfLoad}
          >
            Download Bond
          </FullWidthBtn>
        );
      case BUTTON_STATUSES.ACCEPTED:
        return (
          isTenant && (
            <FullWidthBtn
              onClick={() => handleBuyBond()}
              type="primary"
              loading={btnLoading}
            >
              Buy bond
            </FullWidthBtn>
          )
        );
      case BUTTON_STATUSES.TRANSFER_ACCEPTED:
        return (
          isTenant && (
            <FullWidthBtn
              onClick={() => handleTransferBond()}
              type="primary"
              loading={btnLoading}
            >
              Transfer bond
            </FullWidthBtn>
          )
        );
      case BUTTON_STATUSES.ELIGIBLE:
        return (
          isTenant && (
            <FullWidthBtn
              onClick={() => handleBondRequest()}
              type="primary"
              loading={btnLoading}
            >
              Request for bond
            </FullWidthBtn>
          )
        );
      case BUTTON_STATUSES.REQUESTED:
        return (
          isTenant && (
            <FullWidthBtn
              loading={btnLoading}
              onClick={() => refreshRequestStatus()}
              type="primary"
            >
              Check request status
            </FullWidthBtn>
          )
        );
      case BUTTON_STATUSES.TRANSFER_REQUESTED:
        return (
          isTenant && (
            <FullWidthBtn
              type="primary"
              loading={btnLoading}
              onClick={() => refreshTransferStatus()}
            >
              Check transfer status
            </FullWidthBtn>
          )
        );
      case BUTTON_STATUSES.SHOW_TRANSFER:
        return (
          isTenant && (
            <FullWidthBtn
              type="primary"
              loading={btnLoading}
              onClick={() => handleTransferRequest()}
            >
              Request Transfer
            </FullWidthBtn>
          )
        );
      case BUTTON_STATUSES.PURCHASED:
        return (
          isTenant && (
            <FullWidthBtn
              onClick={() => setOccupiedBondModalVisible(true)}
              type="primary"
            >
              Request for bond
            </FullWidthBtn>
          )
        );
      case BUTTON_STATUSES.LOADING:
        return <SkeletonBtn active></SkeletonBtn>;
      default:
        return null;
    }
  };

  const renderMainMessage = () => {
    switch (buttonStatus) {
      case BUTTON_STATUSES.OCCUPIED:
      case BUTTON_STATUSES.BOND_OWN:
        return (
          <MainButtonText>
            <CheckCircleFilled
              style={{ fontSize: '3rem', color: themeColors.success }}
            />
            <Typography.Title
              style={{ fontWeight: 'normal', margin: '0.1rem 1rem' }}
              level={5}
            >
              Property occupied
            </Typography.Title>
          </MainButtonText>
        );
      case BUTTON_STATUSES.ACCEPTED:
        return (
          isTenant && (
            <MainButtonText>
              <CheckCircleFilled
                style={{ fontSize: '3rem', color: themeColors.success }}
              />
              <Typography.Title
                style={{ fontWeight: 'normal', margin: '0.1rem 1rem' }}
                level={5}
              >
                Bond request approved
              </Typography.Title>
            </MainButtonText>
          )
        );
      case BUTTON_STATUSES.TRANSFER_ACCEPTED:
        return (
          isTenant && (
            <MainButtonText>
              <CheckCircleFilled
                style={{ fontSize: '3rem', color: themeColors.success }}
              />
              <Typography.Title
                style={{ fontWeight: 'normal', margin: '0.1rem 1rem' }}
                level={5}
              >
                Transfer request approved
              </Typography.Title>
            </MainButtonText>
          )
        );
      case BUTTON_STATUSES.NONE:
        return (
          <MainButtonText>
            <InfoCircleFilled
              style={{ fontSize: '3rem', color: themeColors.success }}
            />
            <Typography.Title
              style={{ fontWeight: 'normal', margin: '0.1rem 1rem' }}
              level={5}
            >
              {isTenant
                ? `Not eligible to request for bond`
                : `${noBondRequest} bond requests`}
            </Typography.Title>
          </MainButtonText>
        );
      default:
        return null;
    }
  };
  const handleOk = () => setOccupiedBondModalVisible(false);

  const renderAlreadyOccupied = (
    <InfoDialog
      width="44rem"
      visible={occupiedBondModalVisible}
      title="Ongoing Bond"
      actionBtn="Ok"
      cancelcheck
      onAction={handleOk}
      onCancel={handleOk}
    >
      <HorizontalDiv>
        <InfoCircleOutlined
          style={{ fontSize: '2.8rem', color: themeColors.fail }}
        />
        <Typography.Title
          level={5}
          style={{ fontWeight: 'normal', marginLeft: '1.6rem' }}
        >
          You can not buy a new bond till you cancel the ongoing bond. To
          cancel, go to settings.
        </Typography.Title>
      </HorizontalDiv>
    </InfoDialog>
  );
  const checkEligibility = () => {
    dispatch({
      type: actionIds.GET_OWN_ELIGIBILITY,
      payload: user.id,
    });
    setStatusBtton(BUTTON_STATUSES.LOADING);
  };

  const fetchBond = (filters = '') => {
    dispatch({
      type: actionIds.GET_BONDS,
      payload: {
        filters,
        page: 1,
      },
    });
  };

  const fetchBondRequests = () => {
    dispatch({
      type: actionIds.REQUEST_BOND_FETCH,
      payload: {
        filters: `propertyId=${id}&type=${BOND_REQUEST_TYPES.BUY_BOND}`,
        page: 1,
      },
    });
  };

  const fetchTransferRequests = () => {
    dispatch({
      type: actionIds.REQUEST_BOND_FETCH,
      payload: {
        filters: `propertyId=${id}&type=${BOND_REQUEST_TYPES.TRANSFER_BOND}`,
        page: 1,
      },
    });
  };
  /** Checking property status as user comes in this page,
   *  if its vacant or occupied  */

  useEffect(() => {
    setStatusBtton(BUTTON_STATUSES.LOADING);
    if (user && property) {
      if (property?.status === PropertyStatus.OCCUPIED) {
        fetchBond(`propertyId=${id}`);
      } else {
        if (params.eqaroOrderId) {
          setChecking(false);
          onShowCart(true);
        } else {
          if (isTenant) fetchBond();
          else fetchBondRequests();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property, user]);

  /**Next, check if occupied, then if current user is the tenant
   * or landlord of the property */

  useEffect(() => {
    if (data.bondReducer.errorMessage !== null) {
      if (property?.status === PropertyStatus.OCCUPIED)
        setStatusBtton(BUTTON_STATUSES.OCCUPIED);
      else setStatusBtton(BUTTON_STATUSES.NONE);
    }

    if (data.bondReducer.data !== null) {
      const bond = data.bondReducer.data[0];

      if (bond) {
        setBond(bond);

        if (id === bond.propertyId) {
          dispatch(
            getuserdetailsidemenu({
              uid: bond?.tenantId,
              ut: USER_TYPES.TENANT,
            }),
          );
        }
        if (
          (isTenant && id === bond.propertyId) ||
          (isLandlord && id === bond.propertyId)
        )
          setStatusBtton(BUTTON_STATUSES.BOND_OWN);
        else if (isTenant) {
          if (bond.landlordId !== property?.landlordId)
            setStatusBtton(BUTTON_STATUSES.PURCHASED);
          else fetchTransferRequests();
        } else setStatusBtton(BUTTON_STATUSES.OCCUPIED);
      } else fetchBondRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.bondReducer]);

  useEffect(() => {
    if (data.errorReducer.error !== null) setStatusBtton(BUTTON_STATUSES.NONE);
  }, [data.errorReducer]);

  useEffect(() => {
    if (data.userReducer.userdetailside !== null) {
      setTenant(data.userReducer.userdetailside);
    }
  }, [data.userReducer.userdetailside]);

  /** Next, checking if the user already requested for a bond,
   *  if property is vacant */

  useEffect(() => {
    setStatusBtton(BUTTON_STATUSES.LOADING);

    if (data.bondRequestReducer.data !== null) {
      setNoBondRequests(data.bondRequestReducer.data.length);
      const request = data.bondRequestReducer.data[0];

      if (isTenant) {
        if (request) {
          const status = get(request, 'status', '');
          if (status === 'pending') {
            if (request.type === BOND_REQUEST_TYPES.BUY_BOND)
              setStatusBtton(BUTTON_STATUSES.REQUESTED);
            else if (request.type === BOND_REQUEST_TYPES.TRANSFER_BOND)
              setStatusBtton(BUTTON_STATUSES.TRANSFER_REQUESTED);
          } else if (status === 'accepted') {
            setBondRequest(request);
            if (request.type === BOND_REQUEST_TYPES.BUY_BOND)
              setStatusBtton(BUTTON_STATUSES.ACCEPTED);
            else if (request.type === BOND_REQUEST_TYPES.TRANSFER_BOND)
              setStatusBtton(BUTTON_STATUSES.TRANSFER_ACCEPTED);
          } else if (!bond) checkEligibility();
          else setStatusBtton(BUTTON_STATUSES.SHOW_TRANSFER);
        } else if (!bond) checkEligibility();
        else setStatusBtton(BUTTON_STATUSES.SHOW_TRANSFER);
      } else setStatusBtton(BUTTON_STATUSES.NONE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.bondRequestReducer.data]);

  /** Next, checking if the user is eligible to request a bond,
   *  if no request found */
  useEffect(() => {
    setBtnLoading(false);
    if (data.bondRequestReducer.message !== null) {
      if (bond) setStatusBtton(BUTTON_STATUSES.TRANSFER_REQUESTED);
      else {
        if (
          data.bondRequestReducer.message.status ===
          BOND_REQUEST_STATUS.ACCEPTED
        )
          setStatusBtton(BUTTON_STATUSES.ACCEPTED);
        else setStatusBtton(BUTTON_STATUSES.REQUESTED);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.bondRequestReducer.message]);

  const refreshRequestStatus = () => {
    setStatusBtton(BUTTON_STATUSES.LOADING);
    fetchBondRequests();
  };

  const refreshTransferStatus = () => {
    setStatusBtton(BUTTON_STATUSES.LOADING);
    dispatch(getsingleproperty({ id: id }));
    fetchTransferRequests();
  };

  useEffect(() => {
    if (data.eligibilityReducer.data !== null) {
      const eligibility = data.eligibilityReducer.data;

      if (eligibility.status === TenantStatus.ELIGIBLE)
        setStatusBtton(BUTTON_STATUSES.ELIGIBLE);
      else setStatusBtton(BUTTON_STATUSES.NONE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.eligibilityReducer.data]);

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
          <FullWidthBtn type="default" onClick={handleShareClick}>
            SHARE PROPERTY
          </FullWidthBtn>
          <div style={{ marginTop: '1.6rem' }}>{renderMainMessage()}</div>
        </Col>
      </Row>
    </PropertyCard>
  );

  const renderTenantInfo = () => (
    <SectionDiv className="subsection">
      <Typography.Title level={5} style={{ marginBottom: '2.4rem' }}>
        OCCUPIED BY
      </Typography.Title>
      <HorizontalDiv>
        <Avatar src={get(tenant, 'avatar')} size={56}>
          {!get(tenant, 'avatar') &&
            getInitialsForAvatar(get(tenant, 'name', ''))}
        </Avatar>
        <ValueText
          level={5}
          style={{
            marginLeft: '1.6rem',
          }}
        >
          {get(tenant, 'name')}
        </ValueText>
      </HorizontalDiv>
      <Row style={{ marginTop: '2.4rem' }}>
        <Col sm={24} md={8} lg={8}>
          <div>
            <HeadText>Phone Number</HeadText>
            <ValueText level={5}>{get(tenant, 'phone', '')}</ValueText>
          </div>
        </Col>
        <Col sm={24} md={8} lg={8}>
          <HeadText>Email</HeadText>
          <ValueText level={5}>{get(tenant, 'email', '')}</ValueText>
        </Col>
        <Col sm={24} md={8} lg={8}>
          <HeadText>Bond Id</HeadText>
          <ValueText level={5}>{bond?.bondId}</ValueText>
        </Col>
      </Row>
    </SectionDiv>
  );

  const openInMap = () => {
    window.open(`http://maps.google.com/?q=${addressString}'`, '_blank');
  };

  return (
    <div>
      <BreadCrumbTitle items={getCrumbs()} />
      {property || property !== undefined ? (
        <div>
          <SectionDiv>
            <ComponentDetailHeader
              module="Property"
              permissions={permissionheader}
              title={property.name}
              subtitle={`${property.propertyAddress?.city}, ${property.propertyAddress?.state}`}
              btnTitle="Edit Details"
              deleteLoading={deleteLoading}
              onBtnClicked={handleEditBtnClick}
              onDeleteBtnClicked={handleDeleteClick}
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
                        <HeadText>Property Eqaro Code</HeadText>
                        <ValueText level={5}>{property.eqaroId}</ValueText>
                      </div>
                    </Col>
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
                        <ValueText level={5}>{property.propertyType}</ValueText>
                      </div>
                    </Col>
                    <Col sm={24} md={8} lg={8}>
                      <HeadText>No. of Bedrooms</HeadText>
                      <ValueText level={5}>
                        {`${property.No_of_Bedrooms}`}
                      </ValueText>
                    </Col>
                    <Col sm={24} md={8} lg={8} style={{ marginTop: '0.8rem' }}>
                      <HeadText>No. of Restrooms</HeadText>
                      <ValueText level={5}>
                        {`${property.noOfBathrooms}`}
                      </ValueText>
                    </Col>
                    <Col sm={24} md={8} lg={8} style={{ marginTop: '0.8rem' }}>
                      <HeadText>Age of property</HeadText>
                      <ValueText level={5}>
                        {`${property.propertyAge} year(s)`}
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
                      {property.amenities && property.amenities.length > 0 ? (
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
                {tenant && renderTenantInfo()}
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
      <PropertyForm
        visible={visible}
        onShow={onShow}
        formState={FORM_OPEN_STATE.FORM_EDIT}
        initialValues={property}
      />
      <InfoDialog
        width="44rem"
        visible={modalVisible}
        title="Are you sure?"
        actionBtn="Done"
        onAction={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <VerticalDiv style={{ marginLeft: '1.5rem' }}>
          <HorizontalDiv>
            <InfoCircleOutlined
              style={{ fontSize: '2.8rem', color: themeColors.fail }}
            />
            <Typography.Title
              style={{ marginLeft: '1.8rem' }}
              level={4}
            >{`You sure to delete “${get(
              property,
              'name',
            )}”`}</Typography.Title>
          </HorizontalDiv>
          <ModalText level={5}>
            This property will no longer be available in the database when you
            press done.
          </ModalText>
        </VerticalDiv>
      </InfoDialog>
      {renderAlreadyOccupied}
      {(buttonStatus === BUTTON_STATUSES.ACCEPTED ||
        buttonStatus === BUTTON_STATUSES.TRANSFER_ACCEPTED ||
        params.eqaroOrderId) && (
        <CartPanel
          paymentType={paymentType}
          bondId={bond?.id}
          module="property"
          checking={checking}
          setPaymentType={setPaymentType}
          orderId={params.eqaroOrderId}
          setChecking={setChecking}
          productId={property?.productId}
          propertyId={id}
          handleBondDownload={handleBondDownload}
          onSuccess={onBondPurchaseSuccess}
          onShow={onShowCart}
          visible={isCartVisible}
          cart={cartObject}
        />
      )}
      <SharePropertyCard
        propertyId={id}
        onCancel={handleShareCardShow}
        visible={shareCardVisible}
      />
    </div>
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

const VerticalDiv = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const FullWidthBtn = styled(Button)`
  &.ant-btn {
    width: 100%;
    height: 4rem;
    justify-content: center;
  }
`;

const ModalText = styled(Typography.Title)`
  margin-left: 4.6rem;
  &.ant-typography {
    margin-top: 0.8rem;
    font-weight: normal;
  }
`;

const MainButtonText = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SkeletonBtn = styled(Skeleton.Button)`
  &.ant-skeleton {
    margin-bottom: 1.2rem;
    width: 100%;
    > .ant-skeleton-button {
      width: 100%;
    }
  }
`;
