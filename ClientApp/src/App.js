import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { StudentEntry } from './components/StudentEntry';
import { CalcPayments } from './components/CalcPayments';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/student-entry' component={StudentEntry} />
        <Route path='/calc-payments' component={CalcPayments} />
      </Layout>
    );
  }
}
