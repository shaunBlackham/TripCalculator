import React, { Component } from 'react';
import image1 from '../images/Snow2.PNG';
import image2 from '../images/Tree1.jpeg';
import image3 from '../images/Snow4.JPG';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure() 

function notify() {
    toast.warning("Please navigate back to the Student Entry page and enter at least three students and expenses.", { position: toast.POSITION.TOP_LEFT, autoClose: 5000 });
}

export class CalcPayments extends Component {
    static displayName = CalcPayments.name;

    constructor(props) {
        super(props);
        this.state = { students: [], loading: true };
    }

    componentDidMount() {
        this.populateCalcPayments();
    }

    static renderCalcPaymentsTable(students) {
        return (
            <div>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Reimbursement</th>
                            <th>Paid To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(students =>
                            <tr key={students.name}>
                                <td>{students.name}</td>
                                <td>{students.reimbursement}</td>
                                <td>{students.paidTo}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <img src={image1} style={{ height: 300 }} alt="" /><img src={image2} style={{ height: 300 }} alt="" /><img src={image3} style={{ height: 300 }} alt="" />
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CalcPayments.renderCalcPaymentsTable(this.state.students);

        return (
            <div>
                <h1 id="tabelLabel" >Who owes who money?</h1>
                {contents}
            </div>
        );
    }

    async populateCalcPayments() {
        const count = await(this.getStudentCount());
        if (count < 3) {
            notify();
        } else {
            const response = await fetch('student');
            const data = await response.json();
            this.setState({ students: data, loading: false });
        }
    }

    async getStudentCount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch('student/count', requestOptions);
        const data = await response.json();
        return data;
    }
}
