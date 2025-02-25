import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "200px",
};

export const LoadingSpinner = () => {
  return (
    <ClipLoader
      color={"#123abc"}
      cssOverride={override}
      loading={true}
      size={250}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
