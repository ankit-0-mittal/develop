import styled from 'styled-components';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'app/components/atoms';
import { media } from 'styles/media';

interface CsvUploadProps {
  handleCsvDownload: Function;
  loading: Boolean;
}

export function CsvDownloadButton({
  handleCsvDownload,
  loading,
}: CsvUploadProps) {
  return (
    <CustomBtn
      type="default"
      icon={<DownloadOutlined style={{ fontSize: '1.8rem' }} />}
      onClick={() => handleCsvDownload()}
      loading={loading}
    >
      Download as CSV
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
