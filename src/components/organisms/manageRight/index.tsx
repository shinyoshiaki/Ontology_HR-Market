import * as React from "react";
import ListWorkerMol, { IlistWorkerProps } from "../../molecules/listWorkers";
import { Button } from "@material-ui/core";

export interface ImanageLeftOrgProps extends IlistWorkerProps {
  style?: object;
}

export default class ManageLeftOrg extends React.Component<ImanageLeftOrgProps, {}> {
  constructor(props: ImanageLeftOrgProps) {
    super(props);
  }

  public render() {
    return (
      <div style={this.props.style}>
        <ListWorkerMol {...this.props} />
        <Button>test</Button>
      </div>
    );
  }
}
