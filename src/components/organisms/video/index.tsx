import * as React from "react";
import ReactPlayer from "react-player";
import { TextField, Button } from "@material-ui/core";

interface IvideoProps {
  style?: object;
}

interface IvideoState {
  url?: string;
}

export default class Video extends React.Component<IvideoProps, IvideoState> {
  url?: string;
  constructor(props: IvideoProps) {
    super(props);
    this.state = {
      url: undefined
    };
  }

  render() {
    const { url } = this.state;
    return (
      <div style={this.props.style}>
        <div
          style={{
            border: "1px solid",
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: "#d6d7da",
            margin: 3,
            padding: 10
          }}
        >
          <TextField
            onChange={e => {
              this.url = e.target.value;
            }}
            label="url"
            style={{ width: "80%" }}
          />
          <Button
            onClick={() => {
              this.setState({ url: this.url });
            }}
            style={{ width: "20%" }}
          >
            open
          </Button>
        </div>
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <ReactPlayer
            style={{ position: "absolute", top: 0, left: 0 }}
            url={url}
            playing
            width="100%"
            height="100%"
          />
        </div>
      </div>
    );
  }
}
