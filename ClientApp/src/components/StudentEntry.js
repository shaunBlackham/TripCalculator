import React, { Component } from 'react';
import "bootstrap-css-only";
import '../studentStyle.css';
import image1 from '../images/Snow1.JPG';
import image2 from '../images/Snow5.PNG';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure() 

function notify(message, flag) {
    switch (flag) {
        case 1:
            toast.success(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
            break;
        case 2:
            toast.warning(message, { position: toast.POSITION.TOP_LEFT, autoClose: 5000 });
            break;
        case 3:
            toast.error(message, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 5000 });
            break;
        default:
            break;
    }
}

export class StudentEntry extends Component {
    static displayName = StudentEntry.name;

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            expense: "",
            studentCount: 0,
            errors: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    handleInputChange(event) {
        var key = event.target.name;
        var value = event.target.value;
        var obj = {};
        obj[key] = value;
        this.setState(obj);
    }

    handleSubmit(event) {
        event.preventDefault();

        //VALIDATE
        var errors = [];

        //name
        if (this.state.name === "") {
            errors.push("name");
        }

        // decimal to two places validator
        const expression = /^[0-9]\d{0,9}(\.\d{1,2})?%?$/;
        var validExpense = expression.test(String(this.state.expense));

        if (!validExpense) {
            errors.push("expense");
        } else {
            // check for 0
            if (parseFloat(this.state.expense) === 0 || this.state.expense === "") {
                errors.push("expense");
            }
        }

        this.setState({
            errors: errors
        });

        if (errors.length > 0) {
            return false;
        } else {
            //alert("everything good. submit form!");
            this.submitForm();
        }
    }

    render() {
        return (
            <div>
                <div className="pl-5"><h1>Expense Entry</h1></div>
                <div className="col-lg-12 pl-5">This screen is meant for the entering of expense information.  A name and an expense amount are required.  The expense amount is limited to decimal standards, with only two digits allowed to trail the decimal point. Expenses may be added in total or in smaller increments, as long as the Name is entered correctly. There is a maximum number of 6 total students allowed to be entered.  A running tally will be provided. </div>
                <form className="row">
                    <div className="col-lg-6">
                        <label htmlFor="name">Name</label>
                        <input
                            autoComplete="off"
                            className={
                                this.hasError("name")
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                        />
                        <div
                            className={
                                this.hasError("name") ? "inline-errormsg" : "hidden"
                            }
                        >
                            Please enter a value
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="expense">Expenses</label>
                        <input
                            autoComplete="off"
                            className={
                                this.hasError("expense")
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            name="expense"
                            value={this.state.expense}
                            onChange={this.handleInputChange}
                        />
                        <div
                            className={this.hasError("expense") ? "inline-errormsg" : "hidden"}
                        >
                            Expense is invalid or missing
                        </div>
                    </div>

                    <div className="col-lg-12  padd-top">
                        <button className="btn btn-success" onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
                <div className="col-lg-6 ml-4">Student Count: {this.state.studentCount}</div>
                <div className="ml-5 mt-2">
                    <img src={image1} style={{ height: 300 }} alt="" /><img src={image2} style={{ height: 300 }} alt="" />
                </div>
            </div>
        );
    }
    
    async submitForm() {
        var student = { name: this.state.name, expense: this.state.expense, studentCount: this.state.studentCount };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        };
        const response = await fetch('student', requestOptions);
        const data = await response.json();

        if (data < 0) {
            notify("Maximum number of users entered!", 3);
            this.setState({ studentCount: 6 });
        
        } else {
            var message = "created!";
            var count = data;
            if (data > 6) {
                message = "updated!";
                count -= 6;
            }
            this.setState({ studentCount: count });
            notify("Student/expense record has been " + message, 1);
            this.setState({ name: "", expense: "" });
        }
    }

    async getStudentCount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch('student/count', requestOptions);
        const data = await response.json();
        if (data > 0) {
            this.setState({studentCount:data});
        }
    }

    componentDidMount() {
        this.getStudentCount();
    }
}
