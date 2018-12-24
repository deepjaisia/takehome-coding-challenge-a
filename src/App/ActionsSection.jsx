import React, { Component } from 'react';

// The action section contains of the action buttons on the top of the app which contain: Add target, view statuses of targets, view/hide target table
class ActionsSection extends Component {

    render() {
        return (
            <section>
                <div className="container target-section">
                <div className="row text-center">
                <div className="col-12 col-md-4 mt-2 mb-2" data-toggle="modal" data-target="#modalComponent"> 
                    <button onClick={(e) => this.props.module.methods.addTarget()} className="btn btn-round btn--animate-accent size-2 text--thin" data-toggle="popover" data-trigger="hover" data-content="Add a new target" data-placement="top">
                    <i className="fas fa-plus" /> Add Target
                    </button>
                </div>
                <div className="col-12 col-md-4 mt-2 mb-2">
                    <button onClick={(e) => this.props.module.methods.switchView()} className="btn btn-round btn--animate-accent size-2 text--thin" data-toggle="popover" data-trigger="hover" data-content={(this.props.module.variables.isVisible ? "Hide" : "View") + " all your targets"} data-placement="top">
                    <i className="fas fa-th-list" /> {(this.props.module.variables.isVisible ? "Hide" : "View") + " Targets"}
                    </button>
                </div>
                <div className="col-12 col-md-4 mt-2 mb-2" data-toggle="modal" data-target="#modalComponent">
                <button onClick={(e) => this.props.module.methods.viewStats()} className="btn btn-round btn--animate-accent size-2 text--thin" style={{ fontWeight: 300 }} data-toggle="popover" data-trigger="hover" data-content="View status of your targets" data-placement="top">
                    <i className="fas fa-chart-pie" /> View Stats
                </button>
                </div>
                </div>
                </div>
            </section>
        )
    }
}

export default ActionsSection;