

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class LoadComponent extends Component {
    render() {
        const {isFetching } = this.props;
        if (isFetching === true) {
            return (
                <div className="loading">
                    <span>正在加载..</span>
                </div>
            );
        } else {
            return null;
        }
    }
}




// function mapStateToProps(state) {
//     const {loadReducer} = state;
//     return loadReducer;
// }


// export default connect(mapStateToProps)(Load);