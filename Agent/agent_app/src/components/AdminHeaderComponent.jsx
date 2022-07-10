import React, { Component } from 'react';
//import fish from './fish.png';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';


const navLinkStyle = {
    color: 'black'
}


class AdminHeaderComponent extends Component {
logout(){
    localStorage.clear();
}


    render() {
        return (
            <div>
                <Navbar>
                    <Container>
                        
                        <Navbar.Brand style={navLinkStyle} href="/">AGENT APP</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            <Nav.Link style={navLinkStyle} href="/userprofile" >Profile </Nav.Link>
                            <Nav.Link style={navLinkStyle} href="/companies" > Companies </Nav.Link>    
                             
                            </Nav>


                            <Nav>
                                <Nav.Link style={navLinkStyle} href="/login" onClick={()=>this.logout()}>Logout</Nav.Link>
                                
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default AdminHeaderComponent;