import { InfoCircleFilled } from '@ant-design/icons';
import { Alert } from 'antd';
import { Button, Typography } from 'app/components/atoms';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

export function HeaderAlert({ message, btnText, handleOnClick }) {
  const renderMsg = (
    <Typography.Title level={5} style={{ margin: 0 }}>
      {message}
    </Typography.Title>
  );
  const renderRenewAlert = (
    <CustomAlert
      message={renderMsg}
      type="warning"
      showIcon
      icon={<InfoCircleFilled />}
      closable
      closeText={
        <PrimaryBtnLink size="small" type="link">
          DISMISS
        </PrimaryBtnLink>
      }
      action={
        <PrimaryBtnLink size="small" type="link" onClick={handleOnClick}>
          {btnText}
        </PrimaryBtnLink>
      }
    />
  );

  return <>{renderRenewAlert}</>;
}

const PrimaryBtnLink = styled(Button)`
  &.ant-btn {
    color: ${themeColors.primaryButton};
  }
`;

const CustomAlert = styled(Alert)`
  &.ant-alert {
    padding: 1.6rem;
    > .ant-alert-close-icon {
      padding: 0.2rem 0 0 0;
    }
  }
`;
