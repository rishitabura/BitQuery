import React from 'react'
import {Route , Routes } from 'react-router-dom';

import { Navbar, Sidebar} from './components';
import { CampaignDetails, CreateCampaign, Home, Profile, PostQuestion, UserHome, QuestionDetails } from './pages';
// * Added the PostQuestion page 
// TODO: Remove the Campaign related pages 

const App = () => {
  return (
    <div className="relative sm:-8 p-1 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 
      relative">
        {/* removed sidebar */}
        {/* <Sidebar />    */}
        {/* //TODO: Make sure that the sidebar is visible on all pages except the homepage and the profile page */}
      </div>

      <p className="">
        
      </p>

      <div className="flex-1 max-sm:w-full max-w-
      [1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          // TODO: Remove the create campaign path as well as the campaign details path
          <Route path="/post-question" element={<PostQuestion />} />
          // * Added the post question route
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/question-details/:id" element={<QuestionDetails />} />

        </Routes>
      </div>
    </div>
  )
}

export default App
