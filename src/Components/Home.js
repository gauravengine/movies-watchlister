import React, { Component } from 'react'
import Banner from './Banner'
import Movies from './Movies'
export default class Home extends Component {
  render() {
    return (
      <div data-bs-theme="light">
      <Banner/>
      <Movies/>
      </div>
    )
  }
}
