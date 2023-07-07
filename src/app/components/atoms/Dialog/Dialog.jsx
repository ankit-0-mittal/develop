import { Modal } from 'antd';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

const Dialog = styled(Modal).withConfig({
  shouldForwardProp: prop => !['hideFooter'].includes(prop),
})`
  .ant-modal-title {
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 2.4rem;
    letter-spacing: 0.01em;
    color: ${themeColors.primary};
  }
  .ant-modal-footer {
    display: ${props => props.hideFooter && 'none'};
  }
`;

export default Dialog;
