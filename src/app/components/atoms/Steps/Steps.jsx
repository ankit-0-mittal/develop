import { Steps as AntSteps } from 'antd';
import styled from 'styled-components';
import { media } from 'styles/media';
import { themeColors } from 'styles/theme';

const Steps = styled(AntSteps)`
  .ant-steps-item-title::after {
    height: 0px;
  }

  .ant-steps-item {
    padding-bottom: 4px;
    flex: 1;
    & > .ant-steps-item-container {
      .ant-steps-item-icon {
        font-size: 1.2rem;

        & > .ant-steps-icon {
          color: ${themeColors.textSecondary};
        }
      }
      & > .ant-steps-item-content {
        ${media.mobile`display:none;`}
        ${media.medium`display: initial;`}
        font-family: Lato, serif;
        font-style: normal;
        font-weight: 500;
        line-height: 1.6rem;
        letter-spacing: 0.02em;
        text-transform: uppercase;

        & > .ant-steps-item-title {
          font-size: 1.2rem;
          color: ${themeColors.textSecondary};
        }
        & > .ant-steps-item-description {
          font-size: 1rem;
          color: ${themeColors.accent};
        }
      }
    }
  }
  .ant-steps-item-finish {
    & > .ant-steps-item-container {
      & > .ant-steps-item-icon {
        background-color: ${themeColors.primaryButton};
        border-color: ${themeColors.primaryButton};
        & > .ant-steps-icon {
          color: ${themeColors.white};
        }
      }
      & > .ant-steps-item-content {
        & > .ant-steps-item-title {
          & > ::after {
            height: 0px;
          }
          font-size: 1.2rem;
          color: ${themeColors.primary};
        }
        & > .ant-steps-item-description {
          font-size: 1rem;
          color: ${themeColors.primary};
        }
      }
    }
  }
  .ant-steps-item-process {
    & > .ant-steps-item-container {
      & > .ant-steps-item-icon {
        border-color: ${themeColors.accent};
        background-color: ${themeColors.accent};
        & > .ant-steps-icon {
          color: ${themeColors.accent};
        }
      }
      & > .ant-steps-item-content {
        & > .ant-steps-item-title {
          & > ::after {
            height: 0px;
          }
          font-size: 1.2rem;
          color: ${themeColors.primary};
        }
        & > .ant-steps-item-description {
          font-size: 1rem;
          color: ${themeColors.primary};
        }
      }
    }
  }

  .ant-steps-item-wait {
    & > .ant-steps-item-container {
      & > .ant-steps-item-icon {
        background: transparent;
        color: ${themeColors.primary};
      }
    }
  }
`;

export default Steps;
