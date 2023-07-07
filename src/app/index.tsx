/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd-country-phone-input';
import 'antd/dist/antd.less';
import 'antd-country-phone-input/dist/index.css';

import { GlobalStyle } from 'styles/global-styles';
import en from 'world_countries_lists/data/en/world.json';

import { NotFoundPage } from './components/templates/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import RegisterForm from './pages/RegisterForm';
import { MainPage } from './pages/MainPage';

export function App() {
  const loadScript = src => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  React.useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  });

  const { i18n } = useTranslation();
  return (
    <ConfigProvider locale={en}>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - Eqaro Guarantees"
          defaultTitle="Eqaro Guarantees"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Eqaro application" />
        </Helmet>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/landlord/">
            <RegisterForm type={'public'} />
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </ConfigProvider>
  );
}
