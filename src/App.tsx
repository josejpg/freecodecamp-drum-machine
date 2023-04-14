import React from 'react';
import './App.css';
import { connect, Provider } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./connections/drum.connection";
import { Presentational } from "./Presentational";
import { store } from "./stores/drum.store";

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <Container/>
        </Provider>
    );
  }
};

export default App;
