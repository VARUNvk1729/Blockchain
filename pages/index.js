import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "../routes";
import { Router } from "../routes";
import web3 from "../ethereum/web3";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
} from "semantic-ui-react";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
    ></link>
    <Header
      as="h1"
      content="HACK 'N' WHACK BLOCKCHAIN SYSTEM"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
        fontFamily: "Copperplate",
      }}
    />
    <Header
      as="h2"
      content="Empowering secure and transparent healthcare through blockchain technology"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button primary size="huge" inverted>
      <Link route="/dashboard">
        <a className="item">Get Started</a>
      </Link>
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  };

  onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Media greaterThan="mobile">
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu size="large" inverted>
              <Link route="/">
                <a className="item">Home</a>
              </Link>

              <Menu.Menu position="right">
                <Link route="/dashboard">
                  <a className="item">Dashboard</a>
                </Link>

                <Link route="/list">
                  <a className="item">Records List</a>
                </Link>

                <Dropdown item text="Doctor">
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link route="/">
                        <a
                          style={{ color: "black" }}
                          onClick={this.onClickedDoctor}
                        >
                          View Profile
                        </a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route="/edit-doctor">
                        <a style={{ color: "black" }}>Edit Profile</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route="/make-appointment">
                        <a style={{ color: "black" }}>Make Appointment</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route="/edit-appointment">
                        <a style={{ color: "black" }}>Update Appointment</a>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown item text="Patient">
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link route="/">
                        <a
                          style={{ color: "black" }}
                          onClick={this.onClickedPatient}
                        >
                          View Profile
                        </a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route="/edit-patient">
                        <a style={{ color: "black" }}>Edit Profile</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route="/approve-doctor">
                        <a style={{ color: "black" }}>Allow Access</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route="/revoke-doctor">
                        <a style={{ color: "black" }}>Revoke Access</a>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown item text="Register">
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link route="/register-patient">
                        <a style={{ color: "black" }}>Patient</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route="/register-doctor">
                        <a style={{ color: "black" }}>Doctor</a>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  };

  onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Link route="/">
              <a className="item">Home</a>
            </Link>

            <Link route="/dashboard">
              <a className="item">Dashboard</a>
            </Link>

            <Link route="/list">
              <a className="item">Records List</a>
            </Link>

            <Dropdown item text="Doctor">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/">
                    <a
                      style={{ color: "black" }}
                      onClick={this.onClickedDoctor}
                    >
                      View Profile
                    </a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-doctor">
                    <a style={{ color: "black" }}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/make-appointment">
                    <a style={{ color: "black" }}>Make Appointment</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-appointment">
                    <a style={{ color: "black" }}>Update Appointment</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text="Patient">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/">
                    <a
                      style={{ color: "black" }}
                      onClick={this.onClickedPatient}
                    >
                      View Profile
                    </a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/edit-patient">
                    <a style={{ color: "black" }}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/approve-doctor">
                    <a style={{ color: "black" }}>Allow Access</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/revoke-doctor">
                    <a style={{ color: "black" }}>Revoke Access</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text="Register">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route="/register-patient">
                    <a style={{ color: "black" }}>Patient</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route="/register-doctor">
                    <a style={{ color: "black" }}>Doctor</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

const HomepageLayout = () => <ResponsiveContainer></ResponsiveContainer>;

export default HomepageLayout;
