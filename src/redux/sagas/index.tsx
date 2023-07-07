import { formSaga } from './formSaga';

import { all, call, spawn } from 'redux-saga/effects';
import { message, Modal } from 'antd';
import { actionIds } from 'redux/types/actionsType';

export default function* rootSaga() {
  function* createSaga(saga, index) {
    while (true) {
      try {
        yield call(saga);
        break;
      } catch (e: any) {
        if (e.response) {
          if (e.response?.data?.message) {
            message.error(e.response.data.message);
          } else if (e.response?.data) {
            if (
              JSON.stringify(e.response.data).includes('ValidatorError')
            ) {
              Object.keys(e.response.data).map(key =>
                message.error(e.response.data[key]?.message),
              );
            } else message.error(JSON.stringify(e.response.data));
          } else {
            message.error(e.response.statusText);
          }

        }
      }
    }
  }

  const sagas = [
    formSaga,
  ];

  yield all(sagas.map((saga, index) => spawn(createSaga, saga, index)));
}
