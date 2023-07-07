import { Tabs } from 'antd';
import { InviteCard, UserTable } from 'app/components/organisms';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getuserpermission } from 'redux/actions';
import { CustomTab } from 'app/components/atoms';
import { actionIds } from 'redux/types/actionsType';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { USER_TYPES } from 'utils/constants';

const { TabPane } = Tabs;

export function Users() {
  const history = useHistory();

  const onInviteClicked = () => setInviteVisible(true);
  const [modules, setTdata] = useState<Array<any>>([]);
  const [activeKey, setActiveKey] = useState(USER_TYPES.TENANT);

  const [inviteVisible, setInviteVisible] = useState(false);
  const [inviteeType, setInviteeType] = useState(get(modules[0], 'module', ''));
  const [inviteTitle, setInviteTitle] = useState(get(modules[0], 'module', ''));
  const dispatch = useDispatch();
  const location = useLocation();

  let params = queryString.parse(location.search);

  const useIsAuthenticated = () => {
    const data: any = useSelector(state => state);
    return data.moduleReducer;
  };
  const newdata = useIsAuthenticated();
  useEffect(() => {
    dispatch(getuserpermission());
    dispatch({
      type: actionIds.CHECK_INTERNAL,
    });
  }, []);
  useEffect(() => {
    if (newdata.module !== null) {
      setTdata(newdata.module);
    }
  }, [newdata.module]);

  useEffect(() => {
    setInviteeType(modules[0]?.module);
    setInviteTitle(modules[0]?.label);
  }, [modules]);

  const handleOnChange = key => {
    setActiveKey(key);
    const position = modules.findIndex(mod => mod.module === key);

    setInviteeType(modules[position]?.module);
    setInviteTitle(modules[position]?.label);
  };

  const handleInviteCancel = () => {
    setInviteVisible(false);
  };

  const goToTab = type => history.push(`/home/users?type=${type}`);

  useEffect(() => {
    if (params.type) handleOnChange(params.type);
  }, [params]);

  return (
    <div style={{ width: '100%' }}>
      <CustomTab
        size="middle"
        defaultActiveKey={USER_TYPES.TENANT}
        activeKey={activeKey}
        onChange={goToTab}
      >
        {modules.map((module, index) => (
          <TabPane tab={module.label} key={`${module.module}`}>
            <UserTable
              onInviteClicked={onInviteClicked}
              permissions={module.permissions}
              features={module.features}
              tableType={module.label.replace('s', '').toLocaleLowerCase()}
            />
          </TabPane>
        ))}
      </CustomTab>
      <InviteCard
        title={inviteTitle}
        inviteeUserType={inviteeType}
        onCancel={handleInviteCancel}
        visible={inviteVisible}
      />
    </div>
  );
}
