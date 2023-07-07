import { Tabs } from 'antd';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

export const BaseLayouts = styled.div``;

export const HorizontalDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const VerticalDiv = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`;

export const CustomTab = styled(Tabs)`
  &.ant-tabs {
    > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list {
      > .ant-tabs-tab {
        padding: 0.6rem 3rem;
        margin: 0rem;
        font-weight: normal;
        font-size: 1.4rem;
        line-height: 2.4rem;

        > .ant-tabs-tab-btn {
          color: ${themeColors.primary};
        }
        &.ant-tabs-tab-active {
          font-weight: bold;
        }
      }

      > .ant-tabs-ink-bar {
        background: ${themeColors.accent};
      }
    }
  }
`;

export default BaseLayouts;
