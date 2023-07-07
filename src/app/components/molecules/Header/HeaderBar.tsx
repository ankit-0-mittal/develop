import styled from 'styled-components';
import { BellOutlined, MenuOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';
import { media } from 'styles/media';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { notification } from 'antd';
import { Typography } from 'app/components/atoms';
import { actionIds } from 'redux/types/actionsType';

export function HeaderBar({ onToggle }) {
  const data = useSelector((state: any) => {
    return state;
  });
  const user = useMemo(() => data.userReducer.user, [data.userReducer.user]);
  const [unreadarray, setUnreadarray] = useState<any>(null);
  const dispatch = useDispatch();
  const notifications = useMemo(
    () => data.userReducer.notifications,
    [data.userReducer.notifications],
  );
  const notarray = notifications && notifications.results;
  useEffect(() => {
    if (data.userReducer.notifications !== null) {
      setUnreadarray(
        data.userReducer.notifications.results.filter(x => x.read == false),
      );
    }
  }, [data.userReducer.notifications]);
  useEffect(() => {
    if (data.userReducer.patchnotification !== null) {
      if (user) {
        dispatch({
          type: actionIds.GET_NOTIFICATION,
          payload: user.id,
        });
      }
    }
  }, [data.userReducer.patchnotification]);
  const handleNotification = () => {
    notarray &&
      notarray.map((x, i) =>
        notification.info({
          message: x.title,
          description: (
            <Typography.Title level={5} style={{ fontWeight: 'normal' }}>
              {x.content}
            </Typography.Title>
          ),
          onClose: () => {
            dispatch({
              type: actionIds.PATCH_NOTIFICATION,
              payload: x.id,
              obj: {
                read: true,
                module: 'dashboard',
              },
            });
          },
        }),
      );
  };

  return (
    <HeaderDiv>
      <IconBg onClick={() => onToggle()}>
        <MenuOutlined style={{ fontSize: '2.0rem' }} />
      </IconBg>
      <Badge count={unreadarray?.length} showZero>
        <IconBg>
          <BellOutlined
            style={{ fontSize: '2.0rem' }}
            onClick={handleNotification}
          />
        </IconBg>
      </Badge>
    </HeaderDiv>
  );
}
const CustomInput = styled(Input)`
  margin-left: 1rem;
  padding: 0 ${media.mobile`display: none;`};
  ${media.small`display: none;`};
  ${media.medium`display: flex;`};
  ${media.large`display: flex;`};
  ${media.xlarge`display: flex;`};
  ${media.xxlarge`display: flex;`};
`;

const IconBg = styled.div`
  background: rgba(100, 118, 137, 0.1);
  border-radius: 4px;
  cursor: pointer;
  padding: 0.8rem;
`;
const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  padding: 1.6rem 2.4rem;
  justify-content: space-between;
  align-items: center;
  height: 6.4rem;
  background: white;
`;
