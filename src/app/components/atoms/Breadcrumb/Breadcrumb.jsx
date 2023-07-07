import { Breadcrumb as AntBreadcrumb } from 'antd';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

const Breadcrumb = styled(AntBreadcrumb)`
  font-size: 1.4rem;

  & > span > a {
    color: ${themeColors.textSecondary};
  }

  & > span:last-child {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    line-height: 2.4rem;
    color: ${themeColors.primaryButton};
  }
`;

Breadcrumb.Item = styled(AntBreadcrumb.Item)`
  font-size: 1.4rem;
`;

export default Breadcrumb;
