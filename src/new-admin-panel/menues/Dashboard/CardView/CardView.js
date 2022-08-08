import React , { Component } from 'react'
import './CardView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faCheck , faUpload, faUser} from '@fortawesome/free-solid-svg-icons'

class CardView extends Component{
    render()
    {
        return(
            <div className={"CardView"} style={{ backgroundColor: this.props.color }}>

                <div style={{ display: 'flex', gridGap:'10px'}}>
                <FontAwesomeIcon icon={this.props.icon} size={'3x'}> </FontAwesomeIcon>
                <div>
                <span style={{color: 'white',fontWeight:'bold',fontSize:'16px',textTransform:"uppercase"}}>
                 
                  {this.props.heading}
                  </span>
                  <br></br>
                  <span style={{ fontSize:'18px' }}>{this.props.count}</span>
                </div>

                </div>
              
            </div>
        )
    }
}

export default CardView