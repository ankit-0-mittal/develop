import { Card as AntCard } from 'antd';
import styled, { css } from 'styled-components';
import { themeColors } from 'styles/theme';

const Card = styled(AntCard)`
  .ant-card-head {
    ${props =>
      props.type === 'inner'
        ? ''
        : css`
            border-bottom: none;
          `}

    .ant-card-head-title {
      padding: 0.5rem 0;
      font-weight: bold;
      color: ${props => (props.color ? props.color : themeColors.primary)};
    }
  }

  .ant-card-body {
    padding: ${props => (props.padding ? props.padding : `3rem 0rem 0rem`)};
    .ant-card-meta > .ant-card-meta-detail > .ant-card-meta-title {
      font-family: Lato, serif;
      font-style: normal;
      font-weight: 700;
      font-size: 1.4rem;
      line-height: 2.4rem;

      align-items: center;
      letter-spacing: 0.01em;
      color: ${props => (props.color ? props.color : themeColors.primary)};
    }
  }
`;

export default Card;
