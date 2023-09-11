import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeAnalysis from "./routes/home_analysis"; // Make sure to use uppercase component names
import AnalysisSafeOption from "./routes/analysis_safe_option";
import AnalysisProbableChances from "./routes/analysis_probable_chances";
import AnalysisTooAmbitious from "./routes/analysis_too_ambitious";
import ViewProfileComponent from "./routes/view_profile_component";
// import ViewShortlist from "./routes/view_shortlist";
import ForumFinal from "./routes/forum_final";
import HomePage from "./homeComponents/home_page";
import { UniversityContextProvider } from "./context/universityContext";
import Login from "./routes/Login";
import Register from "./routes/Register";
import UserProfile from "./routes/UserProfile";
import UserForm from "./routes/UserForm";
import ViewCalendar from "./routes/calender";

// import QuestionDetails from './components/QuestionDetails';

const App = () => {
  return (
    
    <UniversityContextProvider>
      <div>
        {process.env.REACT_APP_DEMO === "true" && <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:2000,padding:8,background:"#fff3cd",color:"#332701",textAlign:"center"}}>Synthetic demo: fictional universities, in-memory shortlist. Login, recommendations, forum and calendar are unavailable.</div>}
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/api/user/home" replace />} />
            <Route path="/api/user/nonPersonalized/:userID" element={<HomeAnalysis />} />
            <Route path="/api/user/personalized/:userID/ambitious" element={<AnalysisTooAmbitious />} />
            <Route path="/api/user/personalized/:userID/safe" element={<AnalysisSafeOption />} />
            <Route path="/api/user/personalized/:userID/probable" element={<AnalysisProbableChances />} />
            <Route path="/api/user/student-profile/:userID" element={<ViewProfileComponent />} />
            {/* <Route path="/api/user//profile/:userID/shortlist" element={<ViewShortlist />} /> */}
            <Route path="/api/user/view-forum/:userID" element={<ForumFinal />} />
            <Route path="/api/user/home" element={<HomePage />} />
            <Route path="/api/user/login" element={<Login />} />
            <Route path="/api/user/register" element={<Register />} />
            <Route path="/api/user/user-profile" element={<UserProfile />} />
            <Route path="/api/user/user-form" element={<UserForm />} />
            <Route path="/api/user/my-calendar/:userID" element={<ViewCalendar />} />

            {/* <Route path="/api/user/view-forum/:userID/getQuestion/:questionID" element={QuestionDetails} /> */}
            
          </Routes>
        </Router>
      </div>
    </UniversityContextProvider>
  );
};

export default App;
