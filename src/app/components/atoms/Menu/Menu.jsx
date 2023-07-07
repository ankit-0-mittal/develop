import { Menu as AntMenu } from 'antd';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

const Menu = styled(AntMenu)`
  && {
    &.ant-menu {
      li.ant-menu-item {
        padding: 0.8rem;
        height: auto;
        font-family: Lato;
        font-style: normal;
        font-size: 1.4rem;
        line-height: 2.4rem;
        letter-spacing: 0.01em;

        color: ${themeColors.primary};
      }

      li.ant-menu-item-selected {
        font-weight: bold;
        font-family: Lato;
        font-style: normal;
        font-size: 1.4rem;
        background: transparent;
        line-height: 2.4rem;
        letter-spacing: 0.01em;
        color: ${themeColors.primary};
      }
      li.ant-menu-item-selected,
      li.ant-menu-item:hover {
        border-radius: 0.4rem;
      }
    }
  }
`;

const MainMenu = styled(AntMenu)`
  && {
    &.ant-menu.ant-menu-horizontal {
      background: ${themeColors.darkGrey};
      & > li.ant-menu-item {
        height: auto;
        margin: 0 1rem;

        &:nth-child(2) {
          margin-left: 0;
        }
        &:nth-last-child(2) {
          margin-right: 0;
        }
      }
    }

    &.ant-menu.ant-menu-vertical {
      & > li.ant-menu-item:hover {
        background-color: ${themeColors.darkGrey};
      }
    }

    li.ant-menu-item {
      height: auto;
      font-size: 1.4rem;
    }

    &.ant-menu {
      li.ant-menu-item-selected {
        padding: 0.8rem;
        font-family: Lato;
        font-style: normal;
        font-weight: normal;
        font-size: 1.4rem;
        line-height: 2.4rem;
        border-radius: 0.4rem;

        letter-spacing: 0.01em;

        ::after {
          content: ' ';
          padding-left: 0.5rem;
          background-color: ${themeColors.primaryButton};
          color: red;
          font-weight: bold;
        }
      }
      li.ant-menu-item-selected,
      li.ant-menu-item:hover {
        border-radius: 0.4rem;
        color: ${themeColors.white};

        a {
          color: ${themeColors.white};
        }
      }
    }

    &.ant-menu.ant-menu-inline-collapsed {
      li.ant-menu-item .anticon {
        font-size: 1.6rem;
      }
      li.ant-menu-item,
      li.ant-menu-item-selected {
        padding: 0 calc(50% - 16px / 2);
      }
    }
  }
`;

MainMenu.Item = styled(AntMenu.Item)`
  &.ant-dropdown-menu-item {
    color: ${themeColors.white};
    &:hover {
      background-color: ${themeColors.darkGrey};
      color: ${themeColors.white};
    }
  }
`;

export { MainMenu, Menu };
