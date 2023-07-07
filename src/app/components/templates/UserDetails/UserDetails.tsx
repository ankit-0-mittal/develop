import {
  ComponentDrawer,
  UserDetailsSiderMenu,
} from 'app/components/molecules';
import styled from 'styled-components';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col } from 'app/components/atoms';
import UserDetailsMainMenu from 'app/components/organisms/UserDetailsMainMenu';
import { getuserdetailsidemenu, getuserdetailsmainmenu } from 'redux/actions';

interface UserdetailProps {
  permissions: Array<string>;
  features: Array<string>;
  visible: boolean;
  onShow(show): void;
  edit?: boolean;
  uid: string;
  ut: string;
}

export const UserDetails = ({
  permissions = [],
  features = [],
  visible = true,
  edit = false,
  onShow,
  uid,
  ut,
}: UserdetailProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state;
  });

  function camalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    if (visible) {
      let obj = {
        uid,
        ut,
      };
      dispatch({ type: 'MELIGINULL' });
      dispatch(getuserdetailsidemenu(obj));
      dispatch(getuserdetailsmainmenu(obj));
    }
  }, [dispatch, uid, ut, visible]);
  const role = useMemo(
    () => data.userReducer.internalrole,
    [data.userReducer.internalrole],
  );
  function calluserapprove() {
    let obj = {
      uid,
      ut,
    };
    dispatch(getuserdetailsidemenu(obj));
  }
  return (
    <ComponentDrawer
      placement="right"
      wrapperStyle={{ width: '85%' }}
      bodyStyle={{ padding: '2rem' }}
      title={`${camalize(ut)} Details`}
      visible={visible}
      onShow={onShow}
      form={form}
      footer={false}
    >
      <HorizontalDiv gutter={[32, 32]}>
        <Col xs={24} md={7}>
          <UserDetailsSiderMenu
            permissions={permissions}
            uid={uid}
            ut={ut}
            calluserapprove={calluserapprove}
            features={features}
            internalrole={role}
          />
        </Col>
        <Col xs={24} md={17} style={{ overflow: 'scroll', height: '85vh' }}>
          <UserDetailsMainMenu
            permissions={permissions}
            uid={uid}
            ut={ut}
            features={features}
          />
        </Col>
      </HorizontalDiv>
    </ComponentDrawer>
  );
};

const HorizontalDiv = styled(Row)`
  display: flex;
  flex-direction: row;
  min-height: 100%;
`;
