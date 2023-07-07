import styled from 'styled-components';
import { Select } from 'antd';

const { Option } = Select;

interface Filter {
  filters: Array<string>;
  onSelected(values, options): void;
}

export function FilterDropdown({ filters = [], onSelected }: Filter) {
  return (
    <CustomSelect defaultValue={filters[0]} onChange={onSelected}>
      {filters.map(filter => (
        <Option value={filter}>{filter}</Option>
      ))}
    </CustomSelect>
  );
}

const CustomSelect = styled(Select)`
  display: flex;
  height: 32px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.8rem;
  font-size: 1.4rem;

  background: rgba(100, 118, 137, 0.1);
  border-radius: 4px;

  .ant-select-selector,
  .ant-select-selector:hover {
    background-color: transparent !important;
    border: 0px solid #d9d9d9 !important;
  }
`;
