import { Skeleton, Table as AntTable } from 'antd';
import styled from 'styled-components';
import { themeColors } from 'styles/theme';

const Table = styled(AntTable).attrs(props => ({
  loading: props.loading ? { indicator: <Skeleton active /> } : false,
}))`
  .ant-table {
    border-radius: 0;
    border: ${props => themeColors.secondaryBtn} 1px solid;
  }

  table {
    tr > th {
      background: rgb(238, 239, 243);
    }
    thead.ant-table-thead {
      & > tr > th {
        white-space: nowrap;
        word-break:break-word;
        word-break: break-all
        font-family: Lato;
        font-style: normal;
        font-weight: bold;
        font-size: 1.5rem;
        line-height: 2.4rem;

        align-items: center;
        letter-spacing: 0.01em;

        color: ${themeColors.primary};
        background: rgb(238, 239, 243);
      }
    }
    tbody > tr.ant-table-row {
      font-family: Lato;

      font-style: normal;
      font-weight: normal;
      font-size: 1.4rem;
      line-height: 2.4rem;

      align-items: center;
      letter-spacing: 0.01em;

      color: ${themeColors.primary};

      & > td.ant-table-cell.hide-on-hover > * {
        opacity: 0;
      }

      &:hover {
        & > td.ant-table-cell {
          &:first-child::before {
          }

          &.hide-on-hover > * {
            opacity: 1;
          }
        }
      }
    }
  }
`;

Table.defaultProps = {
  size: 'default',
};

export default Table;
