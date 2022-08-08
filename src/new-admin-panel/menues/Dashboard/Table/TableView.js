import React, { Component } from "react";
import "./TableView.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class TableView extends Component {
  render() {
    let i=0;
    return (
      <div className={"TableView"}>
        <table border="0" cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Institute</th>
              <th>Email</th>
              <th>Course</th>
              <th>Complete Percentange</th>
            </tr>
          </thead>
          <tbody>
            {this.props.studentList.map(( {enrolledCourses,firstName,lastName, institution, email }) => {
              
              i++;
              return (
                
                <tr key={i}>
                  <td>{firstName}{" "}{lastName}</td>
                  <td>{institution}</td>
                  <td><a href={`mailto:${email}`}>{email}</a></td>
                  <td>Research Methodology</td>
                  <td>
                    <CircularProgressbar
                      value={Math.floor((enrolledCourses[0].completedItem
                        /this.props.totalItem)*100)}
                      text={`${Math.floor((enrolledCourses[0].completedItem
                        /this.props.totalItem)*100)}%`}
                      className={"size"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableView;
