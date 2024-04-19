import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faSignOut,
  faUser,
  faUserCircle,
  faList,
  faBell,
  faCalendarCheck,
  faChevronCircleRight,
  faComments,
  faCopy,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"; // เลือกไอคอนที่ต้องการใช้งาน
// import {
//   FaFacebook,
//   FaFacebookMessenger,
//   FaInstagram,
//   FaLine,
//   FaTiktok,
//   FaTwitter,
// } from "react-icons/fa";

export default function Navbars() {
  const [user, setUser] = useState("");

  const load = async () => {
    try {
      let uid = await localStorage.getItem("uid");
      console.log("uid: " + uid);
      if (uid !== null) {
        //setEmail(email)
        fetch("https://sciquiz.cloud/app/profile.php?uid=" + uid)
          .then((response) => response.json())
          .then((json) => setUser(json))
          .catch((error) => console.error(error));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Logout = async () => {
    await localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mt-3">
      <Container>
        <Navbar.Brand href="/">เรียนรู้วิทย์</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faList} color="#000" /> บทเรียน
            </Nav.Link>
            <Nav.Link href="/notification">
              <FontAwesomeIcon icon={faBell} color="#000" /> การแจ้งเตือน
            </Nav.Link>
            <NavDropdown
              title={
                <span>
                  <FontAwesomeIcon icon={faCalendarCheck} color="#000" />{" "}
                  ติดตามผล
                </span>
              }
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="/report/learn">
                <FontAwesomeIcon icon={faChevronCircleRight} color="#000" />{" "}
                ประวัติการเข้าเรียน
              </NavDropdown.Item>
              <NavDropdown.Item href="/report/quiz">
                <FontAwesomeIcon icon={faChevronCircleRight} color="#000" />{" "}
                ประวัติการทำแบบทดสอบ
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title={<span><FontAwesomeIcon icon={faUserCircle} color="#000" />{" "} {user?.name}</span>} id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/profile">
                <FontAwesomeIcon icon={faUser} color="#000" /> โปรไฟล์
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => Logout()}>
                <FontAwesomeIcon icon={faSignOut} color="#000" /> ออกจากระบบ
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
