import { useState, useEffect, useMemo } from 'react';

import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import formLeftImg from '../../assets/form-left.svg';

import {
  scrollToTop,
  SIGNUP_FORMS,
  SIGNUP_STEPPER_CONFIG,
} from 'utils/constants';
import { Row, Col, Typography, HorizontalDiv } from 'app/components/atoms';
import { BasicInfoPage } from './BasicInfoPage';
import { FormStepper } from 'app/components/molecules';
import { themeColors } from 'styles/theme';
import { media } from 'styles/media';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import RegisterFormContext from './RegisterForm.Context';
import { getuser } from 'redux/actions';
import { actionIds } from 'redux/types/actionsType';

interface ParamTypes {
  form: string;
  user: string;
}

export function RegisterForm() {
  const { form = '', user = '' } = useParams<ParamTypes>();
  let role: any = localStorage.getItem('type');
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [profileId, setProfileId] = useState('');
  const [empId, setempId] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const data = useSelector((state: any) => {
    return state;
  });

  useEffect(() => {
    if (data.userReducer.user !== null) {
      setEmail(data.userReducer.user.email);
      setProfileId(data.userReducer.user.profileId);
      if (data.userReducer.user.userType === 'tenant') {
        setempId(data.userReducer.user.employmentDetails?.employment);
        setMonthlyIncome(
          data.userReducer.user.employmentDetails?.monthlyIncome,
        );
      }
    }
  }, [data.userReducer.user]);

  const [userType, setUserType] = useState(user);
  const stepperFormConfig = SIGNUP_STEPPER_CONFIG.find(
    config => userType === config.USER_TYPE,
  );
  const lengthOfForm = useMemo(() => {
    let length = stepperFormConfig?.STEPS[role].filter(
      step => step.show,
    ).length;
    console.log(length);
    if (length) return length;
    else return 1;
  }, [role, stepperFormConfig?.STEPS]);

  const [formName, setFormName] = useState(SIGNUP_FORMS.FORM_BASIC_INFO);

  const getLeftPanelImg = () => {
    switch (formName) {
      case SIGNUP_FORMS.FORM_INCOME_INFO:
      case SIGNUP_FORMS.FORM_PERSONAL_INFO:
      case SIGNUP_FORMS.FORM_BASIC_INFO:
      case SIGNUP_FORMS.FORM_BUSINESS_INDIVIDUAL_INFO:
      case SIGNUP_FORMS.FORM_COAPPLICANT:
        return formLeftImg;
    }
  };
  useEffect(() => {
    dispatch(getuser());
  }, []);

  useEffect(() => {
    setUserType(user);
    handleLinkChange(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, user]);

  const handleLinkChange = (anchor = '') => {
    const segment = stepperFormConfig?.STEPS[role].find(
      formAnchor => formAnchor.form === anchor,
    );

    setFormName(segment?.form || '');
  };

  const renderFormAsChild = comp => {
    return comp;
  };

  const renderForm = () => {
    switch (formName) {
      case SIGNUP_FORMS.FORM_DETAILS:
        return renderFormAsChild(<DetailInfoPage userType={userType} />);
      case SIGNUP_FORMS.FORM_BASIC_INFO:
      default:
        return renderFormAsChild(
          <BasicInfoPage userType={userType} type={role} />,
        );
    }
  };

  const handleLogout = () => {
    dispatch({
      type: actionIds.LOG_OUT,
    });
  };

  const currentPos =
    role === 'Individual'
      ? Object.keys(SIGNUP_FORMS_INDIVIDUAL).findIndex(
          key => SIGNUP_FORMS[key] === formName,
        )
      : Object.keys(SIGNUP_FORMS).findIndex(
          key => SIGNUP_FORMS[key] === formName,
        );

  useEffect(() => {
    scrollToTop(document.getElementById('scroller'));
  }, [formName]);

  return (
    <>
      <Helmet>
        <title>Register Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Row className="full-height-layout">
        <Col xl={8} md={8} sm={0} xs={0} xxl={8}>
          <ImageDiv src={getLeftPanelImg()} />
        </Col>
        <RightColDiv lg={16} md={16} sm={24} xs={24} xl={16} xxl={16}>
          <StepperDiv>
            <FormStepper
              stepper={stepperFormConfig?.STEPS[role]}
              percent={(currentPos / lengthOfForm) * 100}
              current={currentPos}
            />
          </StepperDiv>
          <RegisterFormContext.Provider
            value={{
              emailcontext: email,
              profileId,
              occupationcontext: empId,
              monthlyIncome: monthlyIncome,
            }}
          >
            <ScrollDiv id="scroller">
              <FormDiv>
                <HorizontalDiv style={{ alignItems: 'center' }}>
                  <Typography.Text style={{ fontWeight: 500 }}>
                    {`STEP ${currentPos + 1}/${lengthOfForm}`}
                  </Typography.Text>
                  <HorizontalDiv>
                    <LogoutOutlined
                      style={{ color: '#DC3545', fontSize: '1.5rem' }}
                    />
                    <P
                      style={{
                        fontWeight: 'bold',
                        color: '#DC3545',
                        marginLeft: '0.6rem',
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </P>
                  </HorizontalDiv>
                </HorizontalDiv>

                {renderForm()}
              </FormDiv>
            </ScrollDiv>
          </RegisterFormContext.Provider>
        </RightColDiv>
      </Row>
    </>
  );
}

type ImageDivType = {
  src?: string; ///Passing Optional Props
};

const RightColDiv = styled(Col)`
  ${media.mobile`
    padding: 4rem 0rem 1.5rem 4rem;
  `}
  ${media.medium`
  padding: 3.8rem 0rem 2.5rem 8rem;
  `}
`;

const ImageDiv = styled.div<ImageDivType>`
  height: 100vh;
  background-size: cover;
  background-image: ${(props: ImageDivType) => `url(${props?.src})`};
`;

const StepperDiv = styled.div`
  padding-bottom: 2.5rem;
  border-bottom: 1px solid ${themeColors.lightGrey};
`;

const ScrollDiv = styled.div`
  height: 90vh;
  overflow: auto;
`;

const FormDiv = styled.div`
  ${media.mobile`
  padding: 4rem 4rem 12rem 0rem`}
  ${media.medium`
  padding: 4rem 8rem 6rem 0rem;
  `}
`;

const P = styled(Typography.Text)`
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;
