import { Space as AntSpace } from 'antd';
import styled from 'styled-components';

const Space = styled(AntSpace).withConfig({
  shouldForwardProp: prop => !['justify', 'textAlign', 'block'].includes(prop),
})`
  width: ${props => props.block && '100%'};
  justify-content: ${props => props.justify};
  text-align: ${props => props.textAlign};
`;

Space.defaultProps = {
  justify: 'start',
  textAlign: 'left',
  block: true,
};

export default Space;
