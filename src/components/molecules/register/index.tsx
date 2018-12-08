import * as React from "react";
import { Button, withStyles } from "@material-ui/core";

const styles = (theme: any) => ({
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

export interface RegisterProps {
  register: (v?: any) => void;
}

export class RegisterMol extends React.Component<RegisterProps, {}> {
  nickname: string;
  constructor(props: RegisterProps) {
    super(props);
  }

  public render() {
    const { register } = this.props;

    return (
      <div>
        <div
          style={{
            textAlign: "center",
            border: "1px solid",
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da"
          }}
        >
          {/* <TextField
            label="nick name"
            onChange={e => {
              this.nickname = e.target.value;
            }}
          />
          <br />
          <br /> */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              register(this.nickname);
            }}
          >
            register
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterMol);
