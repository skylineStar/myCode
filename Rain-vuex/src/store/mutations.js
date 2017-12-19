/**
 * Created by Administrator on 2017/3/1 0001.
 */
export const getMsg = (state, payload) => {
  state.msg = payload.msg;
}
export const getMsgc = (state, payload) => {
  payload.msg = state.msg;
}
