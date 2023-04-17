import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedPublic from "./pages/Public/SharedPublic";
import Hero from "./pages/Public/landing/Hero";
import SharedDashBoard from "./pages/dashBoard/SharedLayout";
import AllCustomer from "./pages/dashBoard/AllCustomer";
import NavbarDashBoard from "./components/NavbarDashBoard";
import AuthPage from "./pages/Public/AuthPage";
import Dashboard from "./pages/dashBoard/Dashboard";
import AddCustomer from "./pages/dashBoard/AddCustomer";
import CampaignPage from "./pages/dashBoard/CampaignPage";
import AddSingleForm from "./components/AddSingleForm";

function App() {
  return (
    <BrowserRouter>
      {/* <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route> */}
      <Routes>
        {/* public */}
        <Route path="/" element={<SharedPublic />}>
          <Route index element={<Hero />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        {/* secure */}
        <Route path="/dashboard" element={<NavbarDashBoard />}>
          <Route index element={<Dashboard />} />
          <Route path="all-customer" element={<AllCustomer />} />
          <Route path="add-customer" element={<AddCustomer />}></Route>
          <Route path="add-single-customer" element={<AddSingleForm />} />
          {/* <Route path="add-customer"  /> */}
          <Route path="campaign" element={<CampaignPage />} />
          {/* <Route index element={<AllCustomer />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
