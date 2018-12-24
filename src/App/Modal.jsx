import React, { Component } from 'react';

// Plain modal component which just renders the content that it is given as props
class Modal extends Component {

    render() {
        return (
            <div className="modal fade" id="modalComponent" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header bg--accent-grey-dark text--accent">
                    <h5 className="modal-title" id="exampleModalLabel">Target details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span className="text--accent" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.props.module.variables.content}
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Modal;