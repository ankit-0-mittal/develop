/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, Skeleton, Avatar } from 'antd';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CustomTab } from 'app/components/atoms';
import { PersonalInfo, Residence, Income } from 'app/components/organisms';
import { getuserdetailsidemenu, getuserdetailsmainmenu } from 'redux/actions';
import { useEffect, useState } from 'react';
import { convertToDate } from 'utils/constants';
import { ProfileEditModel } from 'app/components/molecules';
import React from 'react';
import { actionIds } from 'redux/types/actionsType';
const { TabPane } = Tabs;
export function ProfileDetails() {
  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state;
  });

  const [visible, setVisible] = useState(false);

  const inputFileRef = React.useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [newimage, setNewimage] = useState(null);
  const onShow = () => setVisible(true);
  const onCancel = () => setVisible(false);
  useEffect(() => {
    if (data.docReducer.editimage !== null) {
      const avatar = data.docReducer.editimage;
      const userobj = {
        avatar,
      };
      const apidata = {
        userobj,
        Id: data.userReducer.user.id,
      };
      dispatch({ type: actionIds.EDIT_USER_FORM, payload: apidata });
      dispatch({
        type: actionIds.IMAGE_NULL,
      });
    }
  }, [data.docReducer.editimage]);
  useEffect(() => {
    if (selectedFile !== null) {
      setNewimage(URL.createObjectURL(selectedFile));
      onShow();
    }
  }, [selectedFile]);
  useEffect(() => {
    if (data.userReducer.user != null) {
      let ut, uid, obj;
      ut = data.userReducer.user.userType;
      uid = data.userReducer.user.id;
      obj = {
        uid,
        ut,
      };
      dispatch(getuserdetailsidemenu(obj));
      dispatch(getuserdetailsmainmenu(obj));
      setUser(data.userReducer.user);
    }
  }, [data.userReducer.user]);

  useEffect(() => {
    if (data.userReducer.userdetailsmain != null) {
      setPersonal(data.userReducer.userdetailsmain.results[0]);
    }
  }, [data.userReducer.userdetailsmain]);
  const uploadImage = () => {
    inputFileRef?.current?.click();
  };
  const changeHandler = event => {
    setSelectedFile(event.target.files[0]);
  };
  return user && personal ? (
    <div style={{ width: '100%' }}>
      <Div>
        <Circle onClick={uploadImage}>
          <HovImage
            src={user.avatar}
            icon={<UserOutlined style={{ fontSize: '12rem' }} />}
          />
        </Circle>
        <input
          type="file"
          name="myImage"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={changeHandler}
          accept="image/*"
        />
        <VerticalDiv>
          <Name>{user.name}</Name>
          <HorizontalDiv style={{ marginBottom: '0.8rem' }}>
            <StyledDiv>
              <Stylespan>{personal.eqaroId}</Stylespan>
            </StyledDiv>
            {user.userType === 'tenant' ? (
              <StyledDiv2>
                <Stylespan>
                  Max Eligibility: {personal.maxEligibilityAmount}
                </Stylespan>
              </StyledDiv2>
            ) : (
              ''
            )}
          </HorizontalDiv>
          <HorizontalDiv>
            <Stylespan2>{user.email}</Stylespan2>
            <Stylespan3
              style={{
                marginTop: '1rem',
                marginLeft: '0.8rem',
                marginRight: '0.8rem',
              }}
            ></Stylespan3>
            <Stylespan2>{user.phone}</Stylespan2>
          </HorizontalDiv>
          <Stylespan2>Date of Birth: {convertToDate(user.dob)}</Stylespan2>
          <Stylespan2>{user.gender}</Stylespan2>
        </VerticalDiv>
      </Div>
      <Div3>
        <CustomTab defaultActiveKey="1">
          <TabPane tab="Personal Info" key="1">
            <PersonalInfo permissions={['update:own']} />
          </TabPane>
          <TabPane tab="Residence" key="2">
            <Residence permissions={['update:own']} />
          </TabPane>
          {user.userType === 'tenant' ? (
            <TabPane tab="Income" key="3">
              <Income permissions={['update:own']} />
            </TabPane>
          ) : (
            <></>
          )}
        </CustomTab>
      </Div3>
      <ProfileEditModel
        visible={visible}
        onCancel={onCancel}
        image={newimage ? newimage : user.avatar}
      />
    </div>
  ) : (
    <Skeleton active />
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2.4rem;
  margin: 0 -2.4rem;
  background: rgba(0, 120, 206, 0.1);
`;
const Div3 = styled.div`
  padding: 2.4rem;
`;
const VerticalDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
`;
const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const Name = styled.span`
  width: 58.6rem;
  height: 3.2rem;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 3.2rem;
  display: flex;
  align-items: center;
  color: #415060;
  margin: 8px 0px;
`;
const Circle = styled.div`
  width: 17.3rem;
  height: 17.3rem;
  position: relative;
  border: 0.2rem solid #31aab7;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 13.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 3.2rem;
  &:after {
    content: '\A';
    position: absolute;
    top: 0;
    width: 17.3rem;
    height: 17.3rem;
    border: 2px solid #31aab7;
    border-radius: 13.6rem;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(.jpg);
    opacity: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }
  &:before {
    content: 'Update';
    width: 3.9rem;
    height: 1.6rem;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    line-height: 1.6rem;
    display: flex;
    align-items: center;
    color: white;
    z-index: 1;
    text-align: center;
    position: absolute;
    opacity: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
  &:hover {
    &:before {
      opacity: 1;
    }
  }
`;

const HovImage = styled(Avatar)`
  width: 17.3rem;
  height: 17.3rem;
  border: 0.2rem solid #31aab7;
  vertical-align: top;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13.6rem;
  object-fit: cover;
`;
const Stylespan = styled.span`
  width: auto;
  height: 1.6rem;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 1.6rem;
  display: flex;
  align-items: center;
  color: #ffffff;
  flex: none;
  margin: 1rem 0rem;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.1rem 0.8rem;
  min-width: 21.9rem;
  width: auto;
  height: 1.8rem;
  background: #647689;
  border-radius: 0.2rem;
`;
const StyledDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.1rem 0.8rem;
  width: 16.1rem;
  height: 1.8rem;
  background: #647689;
  border-radius: 0.2rem;
  margin: 0rem 0.8rem;
`;
const Stylespan2 = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 2.4rem;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: #a7b1c6;
`;
const Stylespan3 = styled.span`
  width: 0.4rem;
  height: 0.4rem;
  background: #0078ce;
  line-height: 2.4rem;
  display: flex;
  align-items: center;
  border-radius: 4rem;
`;
