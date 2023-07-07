import React from 'react';
import styled from 'styled-components';
import { Button as AntButton } from 'antd';
import { themeColors } from 'styles/theme';

const CustomAntButton = React.forwardRef(
  (
    {
      // eslint-disable-next-line no-unused-vars
      danger,
      colorScheme,
      textSize,
      minWidth,
      ...restProps
    },
    ref,
  ) => <AntButton {...restProps} ref={ref} />,
);

function getTextColor(type = 'primary') {
  if (type === 'primary') return themeColors.white;
  if (type === 'default') return themeColors.primary;
  if (type === 'link') return themeColors.accent;
}

function getBorderColor(type = 'primary') {
  if (type === 'default') return themeColors.textSecondary;
  return themeColors.primaryButton;
}

function getBackgroundColorOnHover(type = 'primary') {
  if (type === 'primary') return themeColors.primaryHover;
}

function getHoverTextColor(type = 'primary') {
  if (type === 'primary') return themeColors.white;
}

/**
 * @type {import('antd').Button}
 */
const Button = styled(CustomAntButton)`
  && {
    border-radius: 0.4rem;
    text-transform: ${props =>
      (props.type === 'primary' || props.type === 'default') && 'uppercase'};
    padding: 0px;
    display: ${props =>
      (props.type === 'primary' || props.type === 'default') && 'flex'};
    align-items: center;
    justify-content: center;
    padding-left: ${props => (props.type === 'link' ? '0' : '2.6rem')};
    padding-right: ${props => (props.type === 'link' ? '0' : '2.6rem')};
    font-family: Lato, serif;
    font-size: ${props => (props.type !== 'link' ? '1.4rem' : '1.2rem')};
    font-weight: 600;
    border-bottom: ${props => props.type === 'link' && `0.1rem`};
    min-width: ${props => props.minWidth};
    letter-spacing: ${props => props.type !== 'link' && '0.1em'};
    &:not(:disabled) {
      background-color: ${props =>
        (props.type === 'primary' && themeColors.primaryButton) ||
        (props.type === 'default' && themeColors.secondaryBtn)};
      text-decoration: ${props => props.type === 'link' && 'underline red'};
      ${props =>
        props.type === 'primary' &&
        `background-color: ${themeColors.primaryButton};`}
      color: ${props => (props.color ? props.color : getTextColor(props.type))};
      border-color: ${props =>
        ['primary', 'link', 'text'].includes(props.type)
          ? 'transparent'
          : getBorderColor(props.type)};
      &:hover,
      &:focus {
        background-color: ${props => getBackgroundColorOnHover(props.type)};
        color: ${props => getHoverTextColor(props.type)};
        text-decoration: ${props => props.type === 'link' && 'underline'};
        border-color: ${props =>
          ['primary', 'link', 'text'].includes(props.type)
            ? 'transparent'
            : getTextColor(props.type)};
      }
    }
  }
`;

Button.defaultProps = {
  colorScheme: 'primary',
};

export default Button;
