import { Menu, Typography, Row, Col } from 'app/components/atoms';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { SETTINGS_MENU } from 'utils/constants';
import { addAlpha, themeColors } from 'styles/theme';

export function Settings() {
  const location = useLocation();

  const data = useSelector((state: any) => {
    return state;
  });
  const user = useMemo(() => data.userReducer.user, [data.userReducer.user]);
  const userType = user?.userType;

  return (
    <div>
      <BrowserRouter>
        <CustomDiv gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <MenuCol>
              <Typography.Title level={4}>Settings</Typography.Title>
              <CustomMenu defaultSelectedKeys={['0']} mode="vertical">
                {SETTINGS_MENU[userType]?.map((menu, index) => (
                  <Menu.Item key={`${index}`}>
                    {menu?.newTab ? (
                      <a
                        href={menu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {menu.title}
                      </a>
                    ) : (
                      <Link to={menu.link}>{menu.title}</Link>
                    )}
                  </Menu.Item>
                ))}
              </CustomMenu>
            </MenuCol>
          </Col>
          <Col span={18}>
            <ContentCol>
              <Switch>
                {SETTINGS_MENU[userType]?.map(({ link, Component }) => (
                  <Route exact path={link} component={Component} />
                ))}
              </Switch>
            </ContentCol>
          </Col>
        </CustomDiv>
      </BrowserRouter>
    </div>
  );
}

const CustomMenu = styled(Menu)`
  background: transparent;
  margin-top: 1.8rem;

  && {
    &.ant-menu {
      li.ant-menu-item-selected {
        font-weight: bold;
        font-family: Lato;
        font-style: normal;
        font-size: 1.4rem;
        background: ${addAlpha(themeColors.primaryButton, 0.3)};
        line-height: 2.4rem;
        color: ${themeColors.textSecondary};
        letter-spacing: 0.01em;
      }
    }
  }
`;

const MenuCol = styled.div`
  padding: 2.4rem;
  height: 80vh;
  background: rgba(167, 177, 198, 0.08);
  box-shadow: inset -1px 0px 4px rgba(0, 0, 0, 0.02);
`;

const ContentCol = styled.div`
  background: #ffffff;
  height: fit-content;
  border: 0.1rem solid rgba(167, 177, 198, 0.3);
  box-sizing: border-box;
  border-radius: 0.4rem;
`;

const CustomDiv = styled(Row)`
  height: 100px;
`;
