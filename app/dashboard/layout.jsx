import { ToastContainer } from "react-toastify";

export default function DashboardLayout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
      />
    </>
  );
}
