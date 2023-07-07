import { call, put, takeEvery, StrictEffect } from 'redux-saga/effects';
import { actionIds, tenantbasicsuccess } from '../types/actionsType';
import baseApi from 'redux/api';
// import { SIGNUP_STEPPER_CONFIG } from 'utils/constants';
import { message } from 'antd';

function* formSaga(): Generator<StrictEffect> {
  yield takeEvery(actionIds.FORM_SUBMIT, createregisterworker);
}


function* createregisterworker(obj) {
  const { userobj, history, check, form = true, userId = '' } = obj.payload;

  const token = localStorage.getItem('token');
  let uid = userId;
  if (userId === '') uid = localStorage.getItem('userId');

  const response: any = yield call(baseApi.post, `/users/${uid}`, userobj, {
    headers: { Authorization: `Bearer ${token}` },
  });

  switch (response.status) {
    case 200:
      const data: tenantbasicsuccess = {
        type: actionIds.FORM_SUBMIT_SUCCESS,
        payload: response.data,
      };

      if (form) {
        if (check === false) {
          history.push(`/home/dashboard`);
        }
      } else yield put(data);
  }
}

export { formSaga };
