/* eslint-disable react-hooks/exhaustive-deps */
import {
  TenantDashbord,
  HighlightSection,
  ProfileHeadSection,
  UserConsentTimeline,
  LandlordDashboard,
} from 'app/components/organisms';
import styled from 'styled-components';
import { Typography, VerticalDiv } from 'app/components/atoms';

import { USER_TYPES } from 'utils/constants';

import 'react-multi-carousel/lib/styles.css';

export function Dashboard(props) {
  const userType = localStorage.getItem('userType');

  const renderDashboard = () => {
    switch (userType) {
      case USER_TYPES.TENANT:
        return <TenantDashbord props={props.props} />;
      case USER_TYPES.LANDLORD:
        return <LandlordDashboard />;
      default:
        return <HighlightSection />;
    }
  };

  return (
    <div>
      <ProfileHeadSection title="Dashboard" />
      {renderDashboard()}
      <VerticalDiv style={{ marginTop: '3rem' }}>
        <Typography.Title style={{ marginTop: '0.8rem' }} level={5}>
          {`Your Consents`}
        </Typography.Title>
        <MarginDiv>
          <UserConsentTimeline />
        </MarginDiv>
      </VerticalDiv>
    </div>
  );
}

const MarginDiv = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
