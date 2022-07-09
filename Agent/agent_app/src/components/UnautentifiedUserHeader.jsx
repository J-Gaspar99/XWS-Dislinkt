import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
const navLinkStyle = {
    color: 'black'
}

class Unautentifieduserheader extends Component {
    render() {
        return (
           
                 <div>
                <Navbar>
                    <Container>
                        
                        <Navbar.Brand style={navLinkStyle} href="/">DISLINKT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">                            
                            <Nav>
                                <Nav.Link style={navLinkStyle} href="/login">Log in</Nav.Link>
                                <Nav.Link style={navLinkStyle} eventKey={2} href="register">
                                    Register account
                                </Nav.Link>
                                <Nav.Link style={navLinkStyle} href="/profiles">See profiles</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div> 
           
        );
    }
}

export default Unautentifieduserheader;
