import { Collapse as AntCollapse } from 'antd';
import styled from 'styled-components';

const CollapsiblePaper = styled(AntCollapse)`
  &.ant-collapse {
    background-color: ${props => props.theme.colors.light};
    max-width: 50rem;
    margin: 2rem auto;
    border-radius: 4px;
    border: none;

    & > .ant-collapse-item:only-child {
      border: none;
    }

    & > .ant-collapse-item > .ant-collapse-header {
      font-weight: bold;
      font-size: calc(${props => props.theme.fontSizes.medium} + 0.25rem);
      padding-left: 3rem;
      padding-right: 3rem;
    }

    & > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }
`;

export default CollapsiblePaper;
