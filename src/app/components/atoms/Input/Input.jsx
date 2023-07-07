import { Input as AntInput } from 'antd';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

const Input = styled(AntInput)`
  &.ant-input {
    font-size: 1.4rem;
    min-height: 3.2rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
    &[type='number'] {
      appearance: textfield;
    }

    &-affix-wrapper {
      padding: 0.4rem 1.1rem 0.4rem 0rem;
      &:focus,
      &:hover,
      &-focused {
        box-shadow: none;
        border-color: ${props => themeColors.primaryButton};
      }
    }
  }

  & .ant-input-disabled {
    color: ${props => props.isError && themeColors.error};
  }
`;

Input.Password = styled(AntInput.Password)`
  &.ant-input,
  &.ant-input-affix-wrapper {
    padding: 0.4rem 1.1rem 0.4rem 0rem;
    min-height: 3.2rem;

    &:focus,
    &:hover,
    &-focused {
      box-shadow: none;
      border-color: ${props => themeColors.primaryButton};
    }

    .ant-input-suffix {
      color: ${props => themeColors.primary};
    }
  }
`;

Input.Search = styled(AntInput.Search)`
  .ant-input-group .ant-input {
    min-height: 3.2rem;
    width: ${props => props.width};
  }
  &.ant-input,
  &.ant-input-affix-wrapper {
    padding: 0.4rem 1.1rem 0.4rem 0rem;

    &:focus,
    &-focused {
      box-shadow: none;
      border-color: ${props => themeColors.primaryButton};
    }

    input {
      height: 3.2rem;
      background: transparent;
    }

    .ant-input-suffix {
      color: ${props => themeColors.primary};
    }
  }
`;

export const SearchHeader = styled(Input)`
  margin-right: 1rem;
  height: 3.2rem;
  padding: 0.3rem;
  background: ${themeColors.secondaryBtn};
  > input {
    background: transparent;
  }

  border: 0.1rem solid rgba(167, 177, 198, 0.2);
  border-radius: 0.4rem;
`;

export default Input;
