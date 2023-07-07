import { createGlobalStyle } from 'styled-components';
import { themeColors } from './theme';
import { media } from './media';

// 10px
export const GlobalStyle = createGlobalStyle`
 html,
  body {
    height: 100%;
    width: 100%;
    font-family: Lato, Arial, sans-serif;
    overflow: hidden;

    ${media.mobile`font-size: 50%`};
    ${media.small`font-size: 50%`};
    ${media.medium`font-size: 60.5%`};   
    ${media.large`font-size: 62.5%`};
    ${media.xlarge`font-size: 70.5%`};
    ${media.xxlarge`font-size: 90%`};
  }

  .ant-space-item {
    .anticon {
      vertical-align: 0rem;
    }
  }

  .ant-message-error {
    display: flex;
    align-items: center;

    .anticon {
      text-align: center;
      font-size: 1.4rem;
    }

    span {
      font-family: Lato, serif;
      font-style: normal;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 1.6rem;
  
      letter-spacing: 0.02em;
    }
  }

  .react-multi-carousel-list {
    padding-bottom: 1rem;
  }
  ul.react-multi-carousel-track li:nth-child(1) .ant-card:nth-child(1) {
    margin-left: 20px;
  }
  ul.react-multi-carousel-track .ant-card {
    margin: 0 5px;
  }

  .react-pdf__Page__canvas {
    margin: 0 auto;
    width: 85% !important;
    height: 50% !important;
  }

  ul.react-multi-carousel-track li:nth-child(1) .ant-card:nth-child(1) {
    margin-left: 0rem !important;
  }

  .react-pdf__Page__textContent {
    width: 0% !important;
    height: 0% !important;
  }
  
  .hideInMobile {
    ${media.mobile`display: none`};
    ${media.small`display: none`};
    ${media.medium`display: initial`};   
    ${media.large`display: initial`};
    ${media.xlarge`display: initial`};
    ${media.xxlarge`display: initial`};
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  .label {
    z-index: 1;
    font-family: Lato, serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.6rem;
    text-transform: uppercase;

    letter-spacing: 0.02em;

    color: ${themeColors.textSecondary};
    pointer-events: none;
    transition: 0.2s ease all;
    transform: translate(0, 2.25rem) scale(1);
  }

  .floating-label {
    font-size: 1.4rem;
    text-transform: uppercase;
    transform: translate(0, 0) scale(1) !important;
    margin-left: 0;
  }

  .carousel-container {
    width: 100%;
  }

  .input-text {
    font-family: Lato, serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.4rem;

    display: flex;
    align-items: center;
    letter-spacing: 0.01em;

    color: ${themeColors.primary};
  }

  .title-text {
    font-family: Lato, serif;
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.4rem;

    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
        
    color: ${themeColors.primary};
  }

  .subtitle-text {
    font-family: Lato, serif;
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.6rem;

    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
        
    color: ${themeColors.primary};
  }

  .footer-text {
    text-align: center;
    font-family: Lato, serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1rem;    
    
    color: ${themeColors.primary};
  }

  .full-height-layout {
    height: 100vh; 
    overflow: hidden; 
  }

  .full-height-layout-scrollable {
    height: 100vh;  
    overflow-y: scroll; 
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  .left-col-padded-div {
    ${media.mobile`
      align-item: center;
      padding: 12rem 4rem 0rem;
    `}
    ${media.small`
      padding: 13rem 12rem 0rem;
    `}
    ${media.medium`
      padding: 12rem 14rem 0rem;
    `}
    ${media.large`
      padding: 8rem 32rem 5rem;
    `}
    ${media.xlarge`
      padding: 8rem 32rem 5rem;
    `}  
    ${media.xxlarge`
      padding: 8rem 32rem 5rem;
    `}
  }

  .horizontal-div {
    display: flex;
    justify-content: start;
    align-items: center;
  }

 .horizontal-div-center {
  display: flex;
  justify-content: center;
  align-items: center;
 }

.full-width {
  text-transform: uppercase;
  margin-top: 3rem;
  height: 4rem;
  width: 100%;
}

.logo-menu {
  padding: 2.4rem 1.6rem;
}

.footer-button {
  font-size: 1rem !important;
  padding-top: 0rem;
  max-height: 2.5rem;
  margin-left: 0.4rem;
  font-weight: 500;
  color: ${themeColors.primary};
  letter-spacing: 0.01em;
}

.ant-popover-message {
  display: flex;
  align-items: center;
}

.ant-popover-message-title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;
  padding-left: 1.6rem;
  
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.ant-popover-message > .anticon {
  font-size: 1.4rem;
  position: initial;
}

.ant-btn-sm {
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  
  letter-spacing: 0.02em;
  text-transform: uppercase;

  padding: 0.2rem 2rem;

  height: auto;
  font-size: 1.2rem;
}

.sticky {
  position:fixed;
  top: 70px;
  margin-left: 100px;
  right:0;
}
`;
