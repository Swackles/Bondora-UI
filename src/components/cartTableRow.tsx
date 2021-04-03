import React from "react";
import Equipment from '../services/EquipmentService';
import { TableRow, TableCell, Button, SvgIcon } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

interface Input {
  item: {
    Equipment: Equipment
    DaysRented: number
    LoyaltyPoints: number
    Price: number
  },
  onRemoveFromCart: (id: number) => void
}

class IndexEquipment extends React.Component<Input> {
  constructor(input: Input | Readonly<Input>) {
    super(input);

    this.removeFromCart = this.removeFromCart.bind(this);
  }

  private removeFromCart() {
    const { onRemoveFromCart, item: { Equipment: { ID } } } = this.props

    onRemoveFromCart(ID);
  }

  public render(): JSX.Element {
    const { item: { Equipment: { Name }, Price, DaysRented } } = this.props

    return (
      <TableRow>
        <TableCell>{Name}</TableCell>
        <TableCell>{DaysRented}</TableCell>
        <TableCell>{Price}</TableCell>
        <TableCell>
          <Button onClick={this.removeFromCart} variant="contained" color="primary">
            <SvgIcon component={CancelIcon} />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default IndexEquipment;
