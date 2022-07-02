import React, { Component } from 'react';


class MenuComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            Menu: []
        }
        this.nextpage = this.nextpage.bind(this);
    }
    

    nextpage(){
        this.props.history.push('/adminprofile');
    }
    render() {
        return (
            <div className="menu">
                <button className="btn btn-primary" onClick={this.nextpage}> Next page</button>
            </div>
        );
    }
}

export default MenuComponent;