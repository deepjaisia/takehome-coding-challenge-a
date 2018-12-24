import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';

class Table extends Component {

    constructor(props) {
        super(props);
        this.statusResolution = this.statusResolution.bind(this);
        this.resolveGraphData = this.resolveGraphData.bind(this);
    }

    // Resolving status to display in table
    statusResolution(id) {
        let status;
        let color;
        switch(id) {
            case 1:
                status = "Researching";
                color = "#0375b4";
                break;
            case 2:
                status = "Pending Approval";
                color = "#f9be02";
                break;
            case 3:
                status = "Approved";
                color = "#00c986";
                break;
            case 4:
                status = "Declined";
                color = "#f53240";
                break;
            default:
                status = "Unknown"
                break;
        }
        return { status: status, color: color };
    }
    
    // Resolving the labels and data for the graph in table
    resolveGraphData({ type, data }) {
        let result = [];
        console.log(data);
        let tempResult = data.split('|');
        if(type === "label") {
            tempResult.map((item) => result.push(parseInt(item.split(':')[0])))
        }
        else if(type === "data") {
            tempResult.map((item) => result.push(parseInt(item.split(':')[1])))
        }
        return result;
    }

    render() {
        return (
            <div>
                {this.props.module === null ? null : 
                <div>
                <hr />
                <table className="table table-light mt-2 table-hover table--tracker text-center" 
                // onClick={(e) => { e.stopPropagation(); e.target.getAttribute('data-action') === 'row-edit' ? this.props.module.methods.editRow(parseInt(e.target.parentNode.parentNode.getAttribute('data-key'))) : this.props.module.methods.deleteRow(parseInt(e.target.parentNode.parentNode.getAttribute('data-key'))) }}>
                >
                <thead className="bg--accent-grey-dark text--accent-grey-light">
                    <tr>
                        {this.props.module.variables.targets.headers.map((header, i) => {
                            return <th key={i}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                {Array.from(this.props.module.variables.targets.data.values()).sort((a,b) => a.id - b.id).map((item) => {
                    return <tr data-key={item.id} key={item.id} className="tracker-row">
                        <td>{item.companyInfo}</td>
                        <td style={{ color: `${this.statusResolution(parseInt(item.status)).color}` }}>
                            <b>{this.statusResolution(parseInt(item.status)).status}</b>
                        </td>
                        <td>{item.keyContacts}</td>
                        <td>
                            <Line data={{ 
                                labels: this.resolveGraphData({ type: 'label', data: item.financialPerformance }),
                                datasets : [{ 
                                    data: this.resolveGraphData({ type: 'data', data: item.financialPerformance }), 
                                    backgroundColor: "#f9be02" 
                                }] 
                                }}
                                options={{ 
                                    legend: { display: false }, 
                                    scales: { 
                                        xAxes: [{ ticks : { display: false } , gridLines: { display: false }} ], 
                                        yAxes: [{ ticks : { display: false }  , gridLines: { display: false }}] } 
                                }} 
                                width={50} height={5} />
                        </td>
                        <td>
                            <i className="btn btn-edit btn-hover fas fa-pen" data-action="row-edit" data-toggle="modal" data-target="#modalComponent" onClick={(e) => this.props.module.methods.editRow(item.id)}/>&nbsp;&nbsp;
                            <i className="btn btn-delete btn-hover fas fa-trash" data-action="row-delete" onClick={(e) => this.props.module.methods.deleteRow(item.id)} />
                        </td>
                    </tr>
                })}
                </tbody>
                </table>
                </div>
                }
            </div>
            
        )
    }
}

export default Table;