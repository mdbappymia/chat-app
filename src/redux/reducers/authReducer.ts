interface AuthState {
  user: any;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: {},
  isLoading: true,
  error: "",
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
