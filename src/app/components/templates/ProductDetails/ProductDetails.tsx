import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileExcelOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import {
  Button,
  Row,
  Col,
  Typography,
  VerticalDiv,
  HorizontalDiv,
  Card,
} from 'app/components/atoms';
import {
  BreadCrumbTitle,
  ComponentDetailHeader,
} from 'app/components/molecules';
import { ProductForm } from 'app/components/organisms';
import styled from 'styled-components';
import { Feature, Product } from 'utils/types/product';
import { convertToCurrency, FORM_OPEN_STATE, FEE_TYPES } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { actionIds } from 'redux/types/actionsType';
import { Skeleton } from 'antd';
import { themeColors } from 'styles/theme';

export function ProductDetails() {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [deleting, setDeleting] = useState(false);
  const [permissions, setPermissions] = useState<Array<string>>([]);

  const onShow = show => {
    setVisible(show);
  };

  const [formState, setFormState] = useState(FORM_OPEN_STATE.FORM_EDIT);
  const { id }: any = useParams();

  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state;
  });

  const urr = useMemo(() => {
    if (data.productReducer.rule !== null) return data.productReducer.rule;
    else return {};
  }, [data.productReducer.rule]);

  useEffect(() => {
    if (product)
      dispatch({
        type: actionIds.FETCH_RULE_DETAILS,
        payload: {
          id: product?.underwritinRuleId,
        },
      });
  }, [dispatch, product]);

  useEffect(() => {
    if (data.productReducer.permissions)
      setPermissions(data.productReducer.permissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.productReducer.permissions]);

  const getFeeFromWeight = (weight: number, amount: number) =>
    (weight / 100) * amount;

  const bondFee = useMemo(
    () =>
      product?.features
        ?.map(({ fee, weight, feeType }) =>
          feeType === 'weightage'
            ? getFeeFromWeight(weight, product?.bondAmount)
            : fee,
        )
        .reduce((a: number, b: number) => a + b, 0),
    [product],
  );

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));

    if (data.productReducer.product !== null) {
      setProduct(data.productReducer.product);
    }

    if (data.productReducer.errorMessage !== null) {
      setProduct(undefined);
    }
  }, [data.productReducer.product, data.productReducer.errorMessage]);

  useEffect(() => {
    setDeleting(false);

    if (data.productReducer.deleteResponse !== null) {
      history.push(`/home/products`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.productReducer.deleteResponse]);

  useEffect(() => {
    setProduct(undefined);
    dispatch({
      type: actionIds.GET_PRODUCT,
      payload: id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCrumbs = () => {
    return [
      {
        name: 'Products',
        link: '/home/products',
      },
      {
        name: 'Details',
      },
    ];
  };

  const handleEditBtnClick = () => {
    setFormState(FORM_OPEN_STATE.FORM_EDIT);
    onShow(true);
  };

  const handleDeleteClick = () => {
    setDeleting(true);
    dispatch({
      type: actionIds.DELETE_PRODUCT,
      payload: id,
    });
  };

  const handleCreateCopyClick = () => {
    setFormState(FORM_OPEN_STATE.FORM_COPY_CREATE);
    onShow(true);
  };

  const onSuccess = () => {
    window.location.reload();
  };

  const renderCopyAndCreateBtn = () => (
    <Button
      style={{ marginLeft: '1.6rem' }}
      type="primary"
      onClick={() => handleCreateCopyClick()}
    >
      Copy and create
    </Button>
  );

  const renderSubtitle = () => <TagTxt>{product?.category}</TagTxt>;
  const renderFeature = (feature: Feature, index: number) => (
    <FeatureDiv>
      <Subhead>{`Feature ${index + 1}`}</Subhead>
      <Row style={{ marginTop: '1.6rem' }}>
        <Col sm={24} md={6} lg={6}>
          <VerticalDiv>
            <HeadText>Asset class</HeadText>
            <Typography.Title level={5}>{feature.assetClass}</Typography.Title>
          </VerticalDiv>
        </Col>
        <Col sm={24} md={6} lg={6}>
          <VerticalDiv>
            <HeadText>Coverage</HeadText>
            <Typography.Title level={5}>{feature.coverage}</Typography.Title>
          </VerticalDiv>
        </Col>
        <Col sm={24} md={6} lg={6}>
          <VerticalDiv>
            <HeadText>
              {feature?.feeType === FEE_TYPES.WEIGHTAGE
                ? 'Weightage'
                : 'Fee amount'}
            </HeadText>
            <Typography.Title level={5}>
              {feature?.feeType === FEE_TYPES.WEIGHTAGE
                ? `${feature.weight} %`
                : convertToCurrency(feature.fee)}
            </Typography.Title>
          </VerticalDiv>
        </Col>
        <Col sm={24} md={6} lg={6}>
          <VerticalDiv>
            <HeadText>Limit</HeadText>
            <Typography.Title level={5}>
              {feature.specificlimit}
            </Typography.Title>
          </VerticalDiv>
        </Col>
      </Row>
    </FeatureDiv>
  );

  const renderOtherDetails = () => (
    <Row style={{ marginTop: '1.6rem' }} gutter={[16, 16]}>
      <Col sm={24} md={8} lg={8}>
        <VerticalDiv>
          <HeadText>Underwriting rule</HeadText>
          <Typography.Title level={5}>{urr?.name}</Typography.Title>
        </VerticalDiv>
      </Col>
      <Col sm={24} md={8} lg={8}>
        <div>
          <HeadText>Tenures (All)</HeadText>
          <Typography.Title level={5}>
            {product?.tenures.map(tenure => `${tenure} Yrs`).join(', ')}
          </Typography.Title>
        </div>
      </Col>
      <Col sm={24} md={8} lg={8}>
        <VerticalDiv>
          <HeadText>Discount for women</HeadText>
          <Typography.Title level={5}>
            {`${product?.discountWomen} %`}
          </Typography.Title>
        </VerticalDiv>
      </Col>
      <Col sm={24} md={8} lg={8}>
        <VerticalDiv>
          <HeadText>Discount</HeadText>
          <Typography.Title
            level={5}
          >{`${product?.discount} %`}</Typography.Title>
        </VerticalDiv>
      </Col>
      <Col sm={24} md={8} lg={8}>
        <VerticalDiv>
          <HeadText>Minimum months of rent</HeadText>
          <Typography.Title
            level={5}
          >{`${product?.minimumMonths} month(s)`}</Typography.Title>
        </VerticalDiv>
      </Col>
      {product?.discount ? (
        <>
          <Col sm={24} md={6} lg={6}>
            <VerticalDiv>
              <HeadText>Discount reason</HeadText>
              <Typography.Title level={5}>
                {product?.discountReason}
              </Typography.Title>
            </VerticalDiv>
          </Col>
        </>
      ) : null}
    </Row>
  );

  const renderConditions = (condition: string) => (
    <ConditionText>
      <Typography.Text>{condition}</Typography.Text>
    </ConditionText>
  );

  const renderPreviewDoc = (
    <HorizontalDiv style={{ justifyContent: 'start' }}>
      <FileExcelOutlined style={{ fontSize: '1.8rem' }} />
      <Button
        type="link"
        target="_blank"
        href={product?.claimDocument}
        style={{ marginLeft: '1.6rem' }}
      >
        VIEW
      </Button>
    </HorizontalDiv>
  );

  const renderRent = (
    <VerticalDiv>
      <HorizontalDiv style={{ justifyContent: 'start' }}>
        <Typography.Title level={3}>{`${convertToCurrency(
          product?.bondAmount,
        )}`}</Typography.Title>
        <SideText level={5}>/Yr (For Reference)</SideText>
      </HorizontalDiv>
      {product?.isValueEditable && (
        <TagTxt bgColor={themeColors.success}>Editable by tenants</TagTxt>
      )}
    </VerticalDiv>
  );

  const renderAmountCard = (
    <AmountCard title={renderRent}>
      <Row style={{ marginTop: '-0.8rem' }}>
        <Col sm={24} md={11} lg={11}>
          <HeadText>Bond Fee</HeadText>
          <ValueText level={5}>{`${convertToCurrency(bondFee)}`}</ValueText>
        </Col>
        <Col sm={24} md={11} lg={11}>
          <HeadText>Yearly reduction</HeadText>
          <ValueText level={5}>{`${product?.discountYearly} %`}</ValueText>
        </Col>
      </Row>
    </AmountCard>
  );

  return (
    <div>
      <BreadCrumbTitle items={getCrumbs()} />
      {product ? (
        <div>
          <SectionDiv>
            <ComponentDetailHeader
              permissions={permissions}
              module="Product"
              deleteLoading={deleting}
              title={product.name}
              subtitle={renderSubtitle()}
              btnTitle="Edit Details"
              extraBtn={renderCopyAndCreateBtn()}
              onBtnClicked={handleEditBtnClick}
              onDeleteBtnClicked={handleDeleteClick}
            />
          </SectionDiv>
          <div>
            <Row gutter={[24, 24]}>
              <Col sm={24} md={16} lg={16}>
                <SectionDiv>
                  <Typography.Title
                    level={5}
                    style={{ marginBottom: '2.4rem' }}
                  >
                    FEATURES
                  </Typography.Title>
                  {product?.features.map(renderFeature)}
                </SectionDiv>
                <SectionDiv className="subsection">
                  <Typography.Title
                    level={5}
                    style={{ marginBottom: '2.4rem' }}
                  >
                    CLAIM CONDITIONS
                  </Typography.Title>
                  <HeadText>CONDIITONS</HeadText>
                  <SubSectionDiv>
                    {product.claimConditions.map(renderConditions)}
                  </SubSectionDiv>
                  <SubSectionDiv>
                    <HeadText>Uploaded Document</HeadText>
                  </SubSectionDiv>
                  <SubSectionDiv>{renderPreviewDoc}</SubSectionDiv>
                </SectionDiv>
                <SectionDiv className="subsection">
                  <Typography.Title
                    style={{ marginBottom: '2.4rem' }}
                    level={5}
                  >
                    OTHER DETAILS
                  </Typography.Title>
                  {renderOtherDetails()}
                </SectionDiv>
              </Col>
              <Col sm={24} md={8} lg={8}>
                <SectionDiv>{renderAmountCard}</SectionDiv>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <Skeleton active />
      )}
      {product && (
        <ProductForm
          onSuccess={onSuccess}
          visible={visible}
          onShow={onShow}
          formState={formState}
          initialValues={product}
        />
      )}
    </div>
  );
}

const Subhead = styled(Typography.Text)`
  &.ant-typography {
    color: ${themeColors.darkGrey};
  }
`;

const FeatureDiv = styled.div`
  border-radius: 4px;
  padding: 1.6rem 2.4rem;
  margin-bottom: 1.6rem;
  border: 1px solid rgba(167, 177, 198, 0.3);
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

const SectionDiv = styled.div`
  margin-top: 2.4rem;
  &.subsection {
    margin: 2.4rem 0rem 0rem 0rem;
    border-radius: 4px;
    padding: 1.6rem 2.4rem;
    border: 1px solid rgba(167, 177, 198, 0.3);
  }
`;

const SubSectionDiv = styled.div`
  margin-top: 1.6rem;
`;

const TagTxt = styled(Typography.Text)<{ bgColor?: string }>`
  &.ant-typography {
    background: ${props =>
      props.bgColor ? props.bgColor : themeColors.greyishBlue};
    border-radius: 2px;
    color: ${themeColors.white};
    padding: 0.1rem 0.8rem;
  }
`;

const ConditionText = styled.div`
  background: rgba(49, 170, 183, 0.1);
  border: 1px solid rgba(167, 177, 198, 0.3);
  border-radius: 4px;
  margin-bottom: 1.6rem;
  padding: 0.8rem 1.6rem;
`;

const AmountCard = styled(Card)`
  border-radius: 0.4rem;
  border-top: 0.4rem solid ${themeColors.accent};
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

const SideText = styled(Typography.Title)`
  &.ant-typography {
    font-weight: normal;
    margin: 0rem 0rem 1.4rem 0.8rem;
  }
`;
