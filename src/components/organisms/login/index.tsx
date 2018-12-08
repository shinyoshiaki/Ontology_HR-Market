import * as React from "react";
import {
  withStyles,
  Typography,
  CssBaseline,
  Paper,
  Avatar
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import { SigninMol, SigninProps } from "../../molecules/signin";
import { RegisterMol, RegisterProps } from "../../molecules/register";

export interface LoginProps extends SigninProps, RegisterProps {
  classes?: any;
}

export class LoginOrg extends React.Component<LoginProps, {}> {
  constructor(props: LoginProps) {
    super(props);
  }

  public render() {
    const { classes, login, register } = this.props;

    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Dtwi
              </Typography>

              <form className={classes.form}>
                <SigninMol classes={classes} login={login} />
                <br />
                <br />
                <RegisterMol register={register} />
              </form>
            </Paper>
          </main>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(({ palette, spacing, breakpoints }) => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: spacing.unit * 3,
    marginRight: spacing.unit * 3,
    [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`
  },
  avatar: {
    margin: spacing.unit,
    backgroundColor: palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: spacing.unit
  },
  submit: {
    marginTop: spacing.unit * 3
  }
}))(LoginOrg);
