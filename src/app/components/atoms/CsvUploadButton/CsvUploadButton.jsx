import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'app/components/atoms';
import { media } from 'styles/media';

interface CsvUploadProps {
  handleCsvUpload: Function;
}

export function CsvUploadButton({ handleCsvUpload }: CsvUploadProps) {
  return (
    <CustomBtn
      type="default"
      icon={<UploadOutlined style={{ fontSize: '1.8rem' }} />}
      onClick={() => handleCsvUpload()}
    >
      Upload .csv
    </CustomBtn>
  );
}

const CustomBtn = styled(Button)`
  &.ant-btn {
    text-transform: none;
    font-weight: normal;
    padding: 0.8rem;
    align-items: center;
    margin-left: 1.6rem;
    ${media.mobile`display: none`};
    ${media.small`display: none`};
    ${media.medium`display: flex`};
  }
`;
