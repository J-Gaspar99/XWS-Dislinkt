import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
const navLinkStyle = {
    color: 'black'
}

class MainAdminHeaderComponent extends Component {


    render() {
        return (
           
                 <div>
                <Navbar>
                    <Container>
                        
                        <Navbar.Brand style={navLinkStyle} href="/homepage">FISHING BOOKER</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">                            
                            <Nav className="container-fluid">
                                <Nav.Link style={navLinkStyle} href="/adminprofile">Profile</Nav.Link>
                                <Nav.Link style={navLinkStyle} eventKey={2} href="/income">Income</Nav.Link>
                                <Nav.Link style={navLinkStyle} eventKey={3} href="/cottages">Cottages</Nav.Link>
                                <Nav.Link style={navLinkStyle} eventKey={4} href="/ships">Ships</Nav.Link>
                                <NavDropdown title="Users" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/cottageowners">Cottage owners</NavDropdown.Item>
                                    <NavDropdown.Item href="/shipowners">Ship owners</NavDropdown.Item>
                                    <NavDropdown.Item href="/fishinginstructors">Fishing instructors</NavDropdown.Item>
                                    <NavDropdown.Item href="/clients">Clients</NavDropdown.Item>   
                                    <NavDropdown.Item href="/alladmins">Admins</NavDropdown.Item>                                    
                                </NavDropdown> 
                                <NavDropdown title="Requests" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/registrationrequests">Registration</NavDropdown.Item>
                                    <NavDropdown.Item href="/adminprofiledeletionrequests">Account deletion</NavDropdown.Item>
                                    <NavDropdown.Item href="/admingraderequests">Grade</NavDropdown.Item>
                                    <NavDropdown.Item href="/adminreviewequests">Review</NavDropdown.Item>                                     
                                </NavDropdown>    
                                <Nav.Link style={navLinkStyle} eventKey={5} href="/complaints">Complaints</Nav.Link> 
                                <Nav.Item classsname="ms-auto"><Nav.Link style={navLinkStyle} href="/login" onClick={()=>localStorage.removeItem('activeUser')}>Logout</Nav.Link></Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div> 
           
        );
    }
}

export default MainAdminHeaderComponent;

