import { RouterStore } from 'mobx-react-router';

import SessionStore from './sessionStore';
import UserStore from './userStore';
import FireStore from './fireStore';
import SpotStore from './spotStore';
import UiStore from './uiStore'
import CommentStore from './commentStore'
import SchoolStore from './schoolStore'

class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.fireStore = new FireStore(this);
    this.spotStore = new SpotStore(this);
    this.commentStore = new CommentStore(this);
    this.uiStore = new UiStore(this);
    this.userStore = new UserStore(this);
    this.routingStore = new RouterStore(this);
    this.schoolStore = new SchoolStore(this);
  }
}


const rootStore = new RootStore();

export default rootStore;