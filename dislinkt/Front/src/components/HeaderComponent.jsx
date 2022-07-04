import React, { Component } from 'react';
//import fish from './fish.png';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';


const navLinkStyle = {
    color: 'black'
}


class HeaderComponent extends Component {

    render() {
        return (
            <div>
                <Navbar>
                    <Container>
                        
                        <Navbar.Brand style={navLinkStyle} href="/">DISLINKT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link style={navLinkStyle} href="/userprofile" >My profile </Nav.Link> 
                                <Nav.Link style={navLinkStyle} href="/userposts" >My posts </Nav.Link>                               
                                <Nav.Link style={navLinkStyle} href="/loggedprofiles" >Profiles </Nav.Link>
                                
                            </Nav>


                            <Nav>
                                <Nav.Link style={navLinkStyle} href="/login">Logout</Nav.Link>
                                
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default HeaderComponent;