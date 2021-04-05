import React, { Component } from 'react';
import image1 from '../images/Jeep1.jpeg';
import image2 from '../images/Snow3.PNG'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Trip Calculator</h1>
        <p>Welcome to the trip calculator! This tool is designed to help <strong>3-6 people</strong> share expenses when going on a trip together.</p>
        <img src={image1} style={{ height: 300 }} alt=""/><img src={image2} style={{ height: 300 }} alt=""/>
        <p>Use the Students tab to enter student names and expense amounts, then use the Calculate Payments tab to find who is being reimbursed.</p>        
        </div>
    );
  }
}
