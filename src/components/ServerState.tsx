type ServerStatePropTypes = {
  isError: boolean;
  isLoading: boolean;
};

const ServerState = ({ isError, isLoading }: ServerStatePropTypes) => {
  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return <p>Error</p>;
  } else {
    return <p></p>;
  }
};

export default ServerState;
