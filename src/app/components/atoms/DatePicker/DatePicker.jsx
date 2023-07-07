import { DatePicker as AntDatePicker } from 'antd';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

const DatePicker = styled(AntDatePicker).attrs(({ placeholder }) => ({
  placeholder: placeholder || '',
}))`
  &.ant-picker {
    > .ant-picker-input {
      font-size: 1.4rem;
      padding: 0rem;
      > input {
        font-size: 1.4rem;
      }
    }
    font-size: 1.4rem;

    padding: 0.4rem 1.1rem 0.4rem 0rem;
    border: 0px;
    border-bottom: 1px solid ${themeColors.lightGrey};
    width: 100%;
    &:focus,
    &:hover,
    &-focused {
      box-shadow: none;
      border-right-width: 0rem !important;
      border-color: ${props => themeColors.primaryButton};
    }
  }
`;

export default DatePicker;
