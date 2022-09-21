import { connect } from 'react-redux'
import React, { Component } from 'react'

type Props = {}

type State = {}

export class AddEditPage extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>AddEditPage</div>
    )
  }
}

// const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect( )(AddEditPage)