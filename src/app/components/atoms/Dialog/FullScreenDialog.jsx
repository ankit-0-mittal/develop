import React from 'react';
import { Drawer as AntDrawer } from 'antd';
import styled from 'styled-components';

import Typography from '../Typography';
import CollapsiblePaper from './CollapsiblePaper';
import { themeColors } from 'styles/theme';

const Drawer = styled(AntDrawer)`
  .ant-drawer-body {
    background-color: ${themeColors.white};
    padding: 0;
  }
`;

const Paper = styled.div`
  background-color: ${props => props.theme.colors.light};
  max-width: 50rem;
  padding: 2rem 3rem;
  margin: 2rem auto;
  border-radius: 4px;
`;

const Title = styled.div`
  background-color: ${props => props.theme.colors.light};
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    margin: 0;
  }
`;

const Body = styled.div``;

const Container = styled.div`
  background-color: ${props => props.theme.colors.light};
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const ContainerTitle = styled(Title)`
  padding: ${props => props.theme.layout.mainLayoutSection.padding};
  text-align: left;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  padding-top: 3rem;
  padding-bottom: 1rem;
`;
const ContainerBody = styled.div`
  padding: ${props => props.theme.layout.mainLayoutSection.padding};
  padding-top: 1rem;
  margin-bottom: 1rem;
  overflow: auto;
`;

const FullScreenDialog = ({
  children,
  visible = false,
  destroyOnClose = false,
  placement = 'bottom',
  closable = true,
  onClose = e => e,
}) => (
  <Drawer
    placement={placement}
    height="100vh"
    width="100%"
    destroyOnClose={destroyOnClose}
    visible={visible}
    closable={closable}
    push={{ distance: 0 }}
    onClose={onClose}
  >
    {children}
  </Drawer>
);

FullScreenDialog.Paper = ({ children, title = '', ...otherProps }) => (
  <Paper {...otherProps}>
    {title && (
      <Title>
        <Typography.Title level={5}>{title}</Typography.Title>
      </Title>
    )}
    <Body>{children}</Body>
  </Paper>
);

FullScreenDialog.Container = ({ children, title = '', ...otherProps }) => (
  <Container {...otherProps}>
    {title && (
      <ContainerTitle>
        <Typography.Title level={5}>{title}</Typography.Title>
      </ContainerTitle>
    )}
    <ContainerBody>{children}</ContainerBody>
  </Container>
);

FullScreenDialog.CollapsiblePaper = CollapsiblePaper;

export default FullScreenDialog;
