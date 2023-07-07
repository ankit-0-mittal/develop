import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';

const { Sider, Content } = AntLayout;

const Layout = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  background-color: white;

  @media print {
    padding: 0;
  }
`;

Layout.Sider = Sider;
Layout.Content = Content;

export default Layout;
