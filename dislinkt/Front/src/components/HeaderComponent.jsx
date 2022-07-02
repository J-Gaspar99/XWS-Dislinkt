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
                                <Nav.Link style={navLinkStyle} href="/userprofile" >Profile </Nav.Link>                                
                                <NavDropdown title="Scheduled" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Ship</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Cottage</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Adventure</NavDropdown.Item>                                    
                                </NavDropdown>
                                <NavDropdown title="History" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/clientshipshistory">Ships I visited</NavDropdown.Item>
                                    <NavDropdown.Item href="/clientcottagehistory">Cottages I visited</NavDropdown.Item>
                                    <NavDropdown.Item href="/clientadventureshistory">Adventures I visited</NavDropdown.Item>                                    
                                </NavDropdown>
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