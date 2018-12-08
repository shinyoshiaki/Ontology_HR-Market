import * as React from "react";
import { Button, FormControl, withStyles, TextField } from "@material-ui/core";

const styles = (theme: any) => ({
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

export interface SigninProps {
  classes?: any;
  login: (phrase: string) => void;
}

export class SigninMol extends React.Component<SigninProps, {}> {
  phrase: string = "";
  constructor(props: SigninProps) {
    super(props);
    console.log({ props });
  }

  public render() {
    const { classes, login } = this.props;

    return (
      <div>
        <div
          style={{
            border: "1px solid",
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da"
          }}
        >
          <FormControl margin="normal" required fullWidth>
            <div style={{ textAlign: "center" }}>
              <TextField
                label="pass frase"
                style={{ width: "90%" }}
                onChange={e => {
                  this.phrase = e.target.value;
                }}
              />
            </div>
          </FormControl>
          <br />
          <br />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              login(this.phrase);
            }}
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SigninMol);
