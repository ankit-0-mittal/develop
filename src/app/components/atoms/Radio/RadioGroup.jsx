import styled from 'styled-components';
import { Radio } from 'antd';
import { themeColors } from 'styles/theme';

const RadioGroup = styled(Radio.Group)`
  & > span {
    font-size: 1.2rem;
  }

  & > label {
    font-size: 1.4rem;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: ${themeColors.accent};
    border-color: ${themeColors.accent};

    &:hover {
      background: ${themeColors.accent};
      border-color: ${themeColors.accent};
    }
  }

  .ant-radio-button-wrapper {
    flex: 1;
    text-align: center;

    &:hover {
      color: ${themeColors.accent};
    }
  }

  ${props =>
    props.fullWidth &&
    `
    && {
      display: flex;
    }

    .ant-radio-button-wrapper {
      flex: 1;
      text-align: center;

      &:hover {
        color: ${themeColors.accent};
      }
    }
  `}

  ${props =>
    props.block &&
    `
    && {
      display: block;
    }
  `};
`;

export default RadioGroup;
