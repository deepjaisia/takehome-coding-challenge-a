import React, { Component } from 'react';
import Table from './Table.jsx';
import Nav from './Nav.jsx';
import ActionsSection from './ActionsSection.jsx';
import Database from '../data-base';
import Modal from './Modal.jsx';
import TargetForm from './TargetForm';
import { Pie } from 'react-chartjs-2';
import '../Styles/main.scss';

class App extends Component {

  constructor() {
    super();

    // local db.js module to handle addition and deletion of new targets, also saves and loads from "LOCALSTORAGE" only
    this.DB = new Database();

    // binding 'action' section
    this.handleTableVisibility = this.handleTableVisibility.bind(this);
    this.handleTargetAddition = this.handleTargetAddition.bind(this);
    this.handleViewStats = this.handleViewStats.bind(this);
    this.actionProps = this.actionProps.bind(this);

    // binding 'targets to add' section
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.addTargetProps = this.addTargetProps.bind(this);

    // binding 'table' actions to section
    this.handleRowDelete = this.handleRowDelete.bind(this);
    this.handleRowEdit = this.handleRowEdit.bind(this);
    this.tableProps = this.tableProps.bind(this);
   
    // modal
    this.modalProps = this.modalProps.bind(this);

    // State
    this.state = { targets: this.DB.targets, isTargetTableVisible: true, modalContent: null };

  }

  // Generator function for properties of sections
  sectionProps() { return { methods: {}, variables: {} } }

  // handle visibility of the table and addition of new blank targets to add
  handleTargetAddition() {
    let newTarget = this.DB.targetSchema();
    this.setState({ modalContent: <TargetForm module={this.addTargetProps(newTarget)} /> })
  }

  handleViewStats() {
    let statuses = this.DB.getTargetsStatus();
    let PieChart = <Pie data={{ 
      labels: ["Researching","Pending Approval","Accepted","Declined"],
      datasets : [{ 
        data: [statuses[1], statuses[2], statuses[3], statuses[4]], 
        backgroundColor: ["#0375b4", "#f9be02", "#00c986", "#f53240"] 
      }] 
    }} options={null} width={"100%"} height={"100%"} />

    this.setState({ modalContent: PieChart })
  }

  handleTableVisibility(e) {
    this.setState({ isTargetTableVisible: !this.state.isTargetTableVisible })
  }

  actionProps() {
    let props = this.sectionProps();
    props.methods["switchView"] = this.handleTableVisibility;
    props.methods["addTarget"] = this.handleTargetAddition;
    props.methods["viewStats"] = this.handleViewStats;
    props.variables["isVisible"] = this.state.isTargetTableVisible;

    return props;
  }

  // Addition of targets section properties
  handleFormSubmission(form) {
    this.DB.addToTargets(form);
    this.setState({ })
  }

  addTargetProps(targetProps) {
    let props = this.sectionProps();
    props.variables["targetToAdd"] = targetProps;
    props.methods["submitForm"] = this.handleFormSubmission;
    
    return props;
  }

  // handle deletion and addition of new rows
  handleRowDelete(id) {
    this.DB.deleteRow(id);
    this.setState({ });
  }

  handleRowEdit(id) {
    let targetToEdit = this.DB.getTarget(id);
    let content = <TargetForm module={this.addTargetProps(targetToEdit)} />;
    this.setState({ modalContent: content })
  }

  tableProps() {
    let props = this.sectionProps();
    props.methods["deleteRow"] = this.handleRowDelete;
    props.methods["editRow"] = this.handleRowEdit;
    props.variables["targets"] = this.state.targets;

    return props;
  }

  // Properties for modal which is the content inside the modal for this application
  modalProps(component) {
    let props = this.sectionProps();
    props.variables["content"] = component;

    return props
  }

  // Contains the main app with all the parts 
  render() {
    return (
      <div>
        <Nav/>
        <main className="mt-5">
          <Modal module={this.modalProps(this.state.modalContent)}/>
          <ActionsSection module={this.actionProps()}/>
          <section className="container mt-3">
            <Table module={this.state.isTargetTableVisible ? this.tableProps() : null} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;