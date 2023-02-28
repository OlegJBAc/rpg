import React, {useEffect} from 'react';
import styles from './App.module.scss';
import Header from "./components/Header/Header";
import AvatarParams from "./components/AvatarParams/AvatarParams";
import Avatar from "./components/Avatar/Avatar";
import {avatarInitializing} from "./redux/reducers/avatar-slice";
import {appDispatchType} from "./redux/store";
import {connect} from "react-redux";

class App extends React.Component<propsType> {
  componentWillMount() {
      this.props.avatarInitializing()
  }
  render() {
      return (
          <div className={styles.app}>
              <Header/>
              <div className={styles.main}>
                  <AvatarParams/>
                  <Avatar/>
              </div>
          </div>
      )
  }
}

const mapDispatchToProps = (dispatch: appDispatchType) => {
    return {
        avatarInitializing: () => dispatch(avatarInitializing({ requiredAction: 'initial' })),
    }
}
const AppContainer = connect(null, mapDispatchToProps)(App)

export default AppContainer;


interface propsType {
    avatarInitializing: () => void
}


