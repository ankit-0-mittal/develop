import { Typography } from 'antd';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

const TypographyTitle = styled(Typography.Title).withConfig({
  shouldForwardProp: prop => !['block'].includes(prop),
})`
  &.ant-typography {
    margin-top: 0px;
    font-size: ${props =>
      (props.level === 5 && `1.4rem`) || (props.level === 4 && `1.6rem`)};
    font-family: Lato;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4rem;
    letter-spacing: 0.01em;
    color: ${themeColors.primary};
  }
`;

const TypographyText = styled(Typography.Text).withConfig({
  shouldForwardProp: prop => !['block', 'fontSize'].includes(prop),
})`
  &.ant-typography {
    margin: 0;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    letter-spacing: 0.02em;
    color: ${themeColors.textSecondary};
    strong {
      font-weight: bold;
    }
  }
`;

Typography.Title = TypographyTitle;
Typography.Text = TypographyText;

export default Typography;
