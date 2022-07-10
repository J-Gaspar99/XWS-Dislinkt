import React, { Component } from 'react';
//import fish from './fish.png';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';


const navLinkStyle = {
    color: 'black'
}


class HeaderComponent extends Component {
logout(){
    localStorage.clear();
}


    render() {
        return (
            <div>
                <Navbar>
                    <Container>
                        
                        <Navbar.Brand style={navLinkStyle} href="/">DISLINKT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">

                                <NavDropdown title="Me" id="basic-nav-dropdown">
                                    
                                    <NavDropdown.Item href="/userprofile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/userposts">Posts</NavDropdown.Item>
                                                                          
                                </NavDropdown>

                                <NavDropdown title="Others" id="basic-nav-dropdown">
                                    
                                    <NavDropdown.Item href="/loggedprofiles">All</NavDropdown.Item>
                                    <NavDropdown.Item href="/myfriends">Friends</NavDropdown.Item>
                                                                          
                                </NavDropdown>                
                                
                                <Nav.Link style={navLinkStyle} href="/notifications" >Notifications </Nav.Link>
                                <Nav.Link style={navLinkStyle} href="/offers" >Job Offers </Nav.Link>
                                
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

export default HeaderComponent;