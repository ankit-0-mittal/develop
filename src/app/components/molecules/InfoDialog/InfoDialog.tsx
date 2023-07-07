import React from 'react';
import { Dialog } from 'app/components/atoms';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Space } from 'app/components/atoms';
import { themeColors } from 'styles/theme';
import styled from 'styled-components';

interface InfoDialogProps {
  title: string;
  actionBtn: string;
  visible: boolean;
  onAction: Function;
  onCancel: Function;
  loading?: boolean;
  width: string;
  children: React.ReactElement;
  cancelcheck?: boolean;
  cancelBtn?: any;
  FootInfo?: any;
  height?: string;
  consentcheck?: boolean;
  logbool?: boolean;
  stylecheck?: boolean;
}

export function InfoDialog({
  title,
  actionBtn,
  cancelBtn = 'Cancel',
  onAction,
  onCancel,
  children,
  width,
  loading = false,
  visible,
  height = '',
  cancelcheck = false,
  consentcheck = false,
  logbool = false,
  stylecheck = true,
  FootInfo = () => {
    return <></>;
  },
}: InfoDialogProps) {
  const renderFoot: JSX.Element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Space justify="start">
        <FootInfo />
      </Space>
      <Space justify="end">
        {cancelcheck === false ? (
          <LargeBtn type="default" style={{}} onClick={() => onCancel()}>
            {cancelBtn}
          </LargeBtn>
        ) : (
          ''
        )}
        {logbool ? (
          <LargeBtn
            loading={loading}
            type="default"
            style={{
              borderColor: '#31AAB7',
              background: 'white',
              color: '#31AAB7',
            }}
            onClick={() => onAction()}
            disabled={consentcheck}
          >
            {actionBtn}
          </LargeBtn>
        ) : (
          <LargeBtn
            loading={loading}
            type="primary"
            onClick={() => onAction()}
            disabled={consentcheck}
          >
            {actionBtn}
          </LargeBtn>
        )}
      </Space>
    </div>
  );

  return (
    <Dialog
      destroyOnClose
      onCancel={() => onCancel()}
      closable={true}
      title={title}
      style={stylecheck === false ? { overflowX: 'hidden' } : {}}
      closeIcon={
        <CloseCircleOutlined
          style={{ fontSize: '2rem', color: themeColors.primary }}
        />
      }
      width={width}
      visible={visible}
      bodyStyle={
        stylecheck
          ? { padding: '2.4rem', overflow: 'auto', height: height }
          : { overflowX: 'hidden', height: height }
      }
      footer={renderFoot}
    >
      {children}
    </Dialog>
  );
}

const LargeBtn = styled(Button)`
  &.ant-btn {
    height: 4rem;
  }
`;
