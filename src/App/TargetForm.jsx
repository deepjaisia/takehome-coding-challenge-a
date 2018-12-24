import React, { PureComponent } from 'react';

class TargetForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { id:"", companyInfo: "", status: 1, keyContacts: "", financialPerformance: "",
          statuses: [{ value: 1, text: "Researching" }, { value: 2, text: "Pending Approval" }, { value: 3, text: "Approved" }, { value: 4, text: "Declined" } ]
        }

        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.fillForm = this.fillForm.bind(this);
    }

    componentWillMount() {
      this.fillForm(this.props.module.variables.targetToAdd);
      return;
    }

    // Using the same form component so updating the form with new values everytime it received new properties
    fillForm({ id, companyInfo, status, keyContacts, financialPerformance }) {
      this.setState({ id, companyInfo, status, keyContacts, financialPerformance });
    }

    componentWillReceiveProps(newProps) {
      this.fillForm(newProps.module.variables.targetToAdd);
      return;
    }
    
    handleFormSubmission(e) {
      e.preventDefault();
      this.props.module.methods.submitForm({ id: this.state.id, companyInfo: this.state.companyInfo, status: this.state.status, keyContacts: this.state.keyContacts, financialPerformance: this.state.financialPerformance} );
      this.setState({ id:"", companyInfo: "", status: 1, keyContacts: "", financialPerformance: "" })
    }

    render() {
        return (
        <form onSubmit={this.handleFormSubmission} className="">
          <div className="row">
            <div className="col-12 text-left">
              <h5>Company Info</h5>
              <input 
                required className="form-control mt-1" type="text" 
                value={this.state.companyInfo} 
                onChange={(event) => { this.setState({ companyInfo: event.target.value }) }} />
            </div>
            
            <div className="col-12 mt-4 text-left">
              <h5>Status</h5>
              <select className="form-control mt-1" onChange={(e) => { this.setState({ status: e.target.value }) } } value={this.state.status}>
                {this.state.statuses.map((status) => <option key={status.value} value={status.value}>{status.text}</option>)}
              </select>
            </div>
            
            <div className="col-12 text-left mt-4">
              <h5>Key Contacts</h5>
              <input 
                required className="form-control mt-2" type="text" 
                value={this.state.keyContacts} 
                onChange={(event) => { this.setState({ keyContacts: event.target.value }) }} />
            </div>
            
            <div className="col-12 text-left mt-4">
              <h5>Financial Performance</h5>
              <input
                required className="form-control mt-1" type="text"
                value={this.state.financialPerformance} 
                onChange={(event) => { this.setState({ financialPerformance: event.target.value }) }} />
            </div>
          </div>

          <div className="text-center mt-5">
            <button style={{ display: "inline-block" }} className="btn btn-round btn--animate-accent text--thin" type="submit">Submit</button>
          </div>
        </form>
        )
    }
}

export default TargetForm;