import { Drawer as AntDrawer } from 'antd';
import styled from 'styled-components';
import { media } from 'styles/media';
import { themeColors } from 'styles/theme';

const Drawer = styled(AntDrawer)`
  &.ant-drawer > .ant-drawer-content-wrapper {
    ${media.mobile`width: 100% !important;`}
    ${media.small`width: 100% !important;`}
    ${media.medium`width: ${props =>
      props.contentWrapperStyle
        ? `${props.contentWrapperStyle.width} !important`
        : `58rem !important`}`}
    ${media.large`width: ${props =>
      props.contentWrapperStyle
        ? `${props.contentWrapperStyle.width} !important`
        : `58rem !important`}`}
  }
  .ant-drawer-content {
    .ant-drawer-wrapper-body > .ant-drawer-body {
      padding: 2.4rem;
    }

    .ant-drawer-wrapper-body > .ant-drawer-footer {
      padding: 1.6rem 2.4rem;
    }

    .ant-drawer-wrapper-body > .ant-drawer-header {
      padding: 1.6rem 2.4rem;
      .ant-drawer-close {
        padding: 1.5rem;
      }
      .ant-drawer-title {
        font-family: Lato, serif;
        font-style: normal;
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 2.4rem;

        letter-spacing: 0.01em;
        color: ${themeColors.primary};
      }
    }
  }
`;

export default Drawer;
