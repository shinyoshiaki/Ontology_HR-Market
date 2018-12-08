import * as React from "react";

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerMol, { IdrawerMolProps } from "../../molecules/drawer";
export interface IheaderOrgProps extends IdrawerMolProps {
  style?: object;
  myAddress: string;
}

interface IheaderOrgState {
  drawerOpen: boolean;
}

export default class HeaderOrg extends React.Component<
  IheaderOrgProps,
  IheaderOrgState
> {
  url?: string;
  constructor(props: IheaderOrgProps) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  handleSwitchDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar style={{ display: "flexbox" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleSwitchDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Ontology Live
            </Typography>
            <Typography
              variant="title"
              color="inherit"
              noWrap
              style={{ marginLeft: "auto" }}
            >
              {this.props.myAddress}
            </Typography>
          </Toolbar>
        </AppBar>
        <DrawerMol
          {...this.props}
          drawerMolClose={this.handleSwitchDrawer}
          drawerOpen={this.state.drawerOpen}
        />
      </div>
    );
  }
}
