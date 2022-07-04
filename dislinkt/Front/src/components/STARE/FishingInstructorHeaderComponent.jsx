import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
const navLinkStyle = {
    color: 'black'
}

class FishingInstructorHeaderComponent extends Component {


    render() {
        return (
           
                 <div>
                <Navbar>
                    <Container>
                        
                        <Navbar.Brand style={navLinkStyle} href="/homepage">FISHING BOOKER</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">                            
                            <Nav className="container-fluid">
                                <Nav.Link style={navLinkStyle} href="/fishinginstructorprofile">Profile</Nav.Link>
                                <Nav.Link style={navLinkStyle} eventKey={2} href="/adventures">Adventures</Nav.Link>
                                
                                <Nav.Item classsname="ms-auto"><Nav.Link style={navLinkStyle} href="/login" onClick={()=>localStorage.removeItem('activeUser')}>Logout</Nav.Link></Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div> 
           
        );
    }
}

export default FishingInstructorHeaderComponent;

