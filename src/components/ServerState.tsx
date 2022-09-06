type ServerStatePropTypes = {
  isError: boolean;
  isLoading: boolean;
};

const ServerState = ({ isError, isLoading }: ServerStatePropTypes) => {
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return <p>Error</p>;
  }
};

export default ServerState;
