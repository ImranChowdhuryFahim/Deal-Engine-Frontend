import React, { Component } from 'react'
import './Dashboard.css'
import axios from 'axios';
import CardView from './CardView/CardView'
import TableView from './Table/TableView'
import { faDollarSign, faGraduationCap,  faUsers,faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons'
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';


class Dashboard extends Component{
    constructor() {
        super();
        this.state = {
          studentList: null,
          totalItem: null,
          totalStudents: null,
          totalCoursers: 1,
        };
      }
    componentDidMount()
    {
        axios({
            method: 'GET',
            url: "https://beresearcherbd.herokuapp.com/api/student/get_all_enrolled_students/Research Methodology",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((Result)=>{
              this.setState({studentList: Result.data})
              // console.log(Result.data)
          })

          axios({
            method: 'GET',
            url: "https://beresearcherbd.herokuapp.com/api/course/gettotalitem/Research Methodology",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((Result)=>{
              this.setState({totalItem: Result.data.totalItem})
              // console.log(Result.data.totalItem)
          })

          axios({
            method: 'GET',
            url: "https://beresearcherbd.herokuapp.com/api/student/getall",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((Result)=>{
              this.setState({totalStudents: Result.data.length})
              // console.log(Result.data.length)
          })

    }
    render()
    {
        const loaderCss = css`
      height: 100vh;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
        return(
            <div className={"dashboardContent"}>
                {this.state.studentList !== null && this.state.totalItem !== null  && this.state.totalStudents !== null ? (
                <div>
                <div className={"cards"}>
                <CardView color={"#0054f0"} icon={faUsers} count={this.state.totalStudents} heading={"Total Students"}></CardView>
                <CardView color={"#dd4b39"} icon={faChalkboardTeacher} count={6} heading={"Total Supervisors"}></CardView>
                <CardView color={"#770ff5"} icon={faGraduationCap} count={1} heading={"Total Course"}></CardView>
                <CardView color={"#ffa930"} icon={faDollarSign} count={0} heading={"Fees Collection"}></CardView>
                </div>
                <TableView studentList={this.state.studentList} totalItem= { this.state.totalItem}></TableView>
                </div>):(
                    <div style={{margin:'0 auto'}}>
                    <BeatLoader
                      css={loaderCss}
                      loading
                      size={'30'}
                      color={'blue'}
                    ></BeatLoader>
                  </div>
                )}
                
               
            </div>
           
        )
    }
}

export default Dashboard