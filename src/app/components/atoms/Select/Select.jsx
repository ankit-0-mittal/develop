import { Select as AntSelect } from 'antd';
import styled from 'styled-components';

const Select = styled(AntSelect)`
  &.ant-select {
    box-shadow: none;

    font-size: 1.4rem;
    &:focus,
    &-focused {
      box-shadow: none;
    }

    & .ant-select:hover,
    & .ant-select:focus,
    & .ant-select-selector,
    & .ant-select-focused {
      & .ant-select-item {
        padding: 0.8rem;
        font-size: 1.4rem;
      }
      box-shadow: none !important;
      border: 0px;
      padding: 0rem;
      & .ant-select-selection-search {
        left: 0;
        right: 0;
      }
    }
  }
`;

export default Select;
