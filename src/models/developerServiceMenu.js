export default {
  namespace: 'developerServiceMenu',

  state: {
    current: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/developerService') != -1) {
            dispatch({
                type: 'setCurrent',
                current: pathname
            });
        }
      });
    },
  },

  reducers: {
    setCurrent(state, { current }) {
      return {
        ...state,
        current
      };
    },
  },
};
