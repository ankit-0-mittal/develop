import { Checkbox as AntCheckbox } from 'antd';
import styled from 'styled-components';

const Checkbox = styled(AntCheckbox)`
  margin-top: 0.8rem;
  &.ant-checkbox-wrapper {
    font-family: Lato, serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.4rem;
    letter-spacing: 0.01em;
    color: #415060;
    > .ant-checkbox {
      font-size: 10px;
      > .ant-checkbox-inner {
        width: 14px;
        height: 14px;
      }
    }
  }
`;

export default Checkbox;
