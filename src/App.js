import { RouterProvider } from "react-router-dom";
import router from "./routes.js";
import { SnackbarProvider } from 'notistack';
function App() {

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
    <RouterProvider router={router} />
  </SnackbarProvider>
  );
}

export default App;
