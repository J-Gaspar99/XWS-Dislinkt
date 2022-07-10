import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import background from './images/back.jpg';

import HeaderComponent from './components/HeaderComponent';
import HomePageComponent from './components/HomePageComponent';
import RegistrationComponent from './components/RegistrationComponent';
import LoginComponent from './components/LoginComponent';
import ProfilesComponent from './components/ProfilesComponent';
import ViewProfileComponent from './components/ViewProfileComponent';
import ViewPostsComponent from './components/ViewPostsComponent';
import UserProfileComponent from './components/UserProfileComponent';
import UserPostsComponent from './components/UserPostsComponent';
import CreatePostComponent from './components/CreatePostComponent';
import Unautentifieduserheader from './components/UnautentifiedUserHeader';
import LoggedProfileComponent from './components/LoggedProfileComponent';
import LoggedViewPostsComponent from './components/LoggedViewPostsComponent';
import LoggedPostCommentsComponent from './components/LoggedPostCommentsComponent';
import MyFriendsComponent from './components/MyFriendsComponent';
import ChatComponent from './components/ChatComponent';
import FollowRequestComponent from './components/FollowRequestsComponent';
import BlockedUsersComponent from './components/BlockedUsersComponent';
import NotificationsComponent from './components/NotificationsComponent';
import UploadImageComponent from './components/UploadImageComponent';
import DisplayImageComponent from './components/DisplayImageComponent';
import OffersComponent from './components/OffersComponent';
import OfferProfileComponent from './components/OfferProfileComponent';
import CommentsComponent from './components/CommentsComponent';
import CreateCommentComponent from './components/CreateCommentComponent';




const backStyle = {
  width: '100%',
  height: '938px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover' 
};


function headerDefinition(){

  if(localStorage.getItem('activeUser')==null){
    return(<Unautentifieduserheader/>)
  }
else{
  return( <HeaderComponent/>)
}

  
}


function App() {
  
  return (

    <div style={backStyle}> 
      
        <Router>
          
         {headerDefinition() } 
          <div className="container">
            <Switch> 
        
            <Route path = "/" exact component={HomePageComponent}></Route>
              <Route path = "/login" exact component={LoginComponent}></Route>
              <Route path = "/register" component={RegistrationComponent}></Route>
      
              <Route path = "/login" component={LoginComponent}></Route>
              <Route path = "/homepage" component={HomePageComponent} ></Route>
              <Route path = "/profiles" component={ProfilesComponent} ></Route>
              <Route path = "/viewprofile" component={ViewProfileComponent} ></Route>
              <Route path = "/viewposts" component={ViewPostsComponent} ></Route>
              <Route path = "/userprofile" component={UserProfileComponent} ></Route>
              <Route path = "/userposts" component={UserPostsComponent} ></Route>
              <Route path = "/loggedprofiles" component={LoggedProfileComponent} ></Route>
              <Route path = "/createpost" component={CreatePostComponent} ></Route>
              <Route path = "/loggedviewposts" component={LoggedViewPostsComponent} ></Route>
              <Route path = "/loggedpostcomments" component={LoggedPostCommentsComponent} ></Route>
              <Route path = "/notifications" component={NotificationsComponent} ></Route>
              <Route path = "/chat" component={ChatComponent} ></Route>
              <Route path = "/followrequests" component={FollowRequestComponent} ></Route>
              <Route path = "/blockedusers" component={BlockedUsersComponent} ></Route>
              <Route path = "/myfriends" component={MyFriendsComponent} ></Route>
              <Route path = "/uploadimage" component={UploadImageComponent} ></Route>
              <Route path = "/displayimage" component={DisplayImageComponent} ></Route>
              <Route path = "/offers" component={OffersComponent} ></Route>
              <Route path = "/offerprofile" component={OfferProfileComponent} ></Route>
              <Route path = "/comments" component={CommentsComponent} ></Route>
              <Route path = "/createcomment" component={CreateCommentComponent} ></Route>




              </Switch>
          </div>
                                
        </Router>
     
     
    </div>
    
  );
}

export default App;
