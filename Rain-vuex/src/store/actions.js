export const fun = ({commit}) => {
  commit({
    type: 'getMsg',     //对应mutation.js中的getMsg方法
    msg: '我是修改后的数据'
  });
};
export const func = ({commit}) => {
commit({
    type: 'getMsgc',     //对应mutation.js中的getMsgc方法
    msg: '怎么显示msg内容'
});
};
