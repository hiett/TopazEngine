import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "./css/Main.css";
import "./css/LeftBarItem.css";

export default class LeftBarItem extends Component {
    render() {
        let _itemClass = "fas fa-fw fa-" + this.props.icon;
        
        return (
            <Link to={this.props.linkTo}>
                <div className="LeftBarItem">
                    <p><i style={{paddingRight: "25px"}} 
                        className={_itemClass}></i>{this.props.title}</p>
                </div>    
            </Link>
        );
    }
}