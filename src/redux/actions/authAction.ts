export const setUser = (payload: any) => {
  return {
    type: "SET_USER",
    payload,
  };
};

export const setIsLoading = (payload: boolean) => {
  return {
    type: "SET_IS_LOADING",
    payload,
  };
};

export const setError = (payload: string) => {
  return {
    type: "SET_ERROR",
    payload,
  };
};
