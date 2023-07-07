import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Typography from '../Typography';
import styled from 'styled-components';

const { Dragger } = Upload;

type TextProps = {
  name: string;
  multiple?: boolean;
  action?: string;
  fileList: any;
  setFileList: (any) => any;
  onChange: (any) => any;
  headers?: any;
  onDrop: (any) => void;
  beforeUpload: (any) => any;
  data: any;
};
export function UploadCard(props: TextProps) {
  return (
    <ParentDiv>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <Typography.Title style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
          Click or drag file to this area to upload
        </Typography.Title>
        <Typography.Text style={{ padding: '1rem' }}>
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data
        </Typography.Text>
      </Dragger>
    </ParentDiv>
  );
}

const ParentDiv = styled.div`
  padding: 0rem;
`;
