import React from "react";
import Equipment from './../../services/EquipmentService';
import { Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Typography } from '@material-ui/core';
import EquipmentTableRow from './../../components/equipmentTableRow';

interface State {
  equipments: Equipment[]
  cart: any
}

class IndexEquipment extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      equipments: [],
      cart: {}
    }

    this.addToCart = this.addToCart.bind(this);
  }

  public componentDidMount() {
    Equipment.GetAll().then(value => {
      this.setState({ ...this.state, equipments: value });
    });

    let localCart = localStorage.getItem("Cart")
    if (localCart) {
      this.setState({ ...this.state, cart: JSON.parse(localCart) });
    }
  }

  private addToCart(id: number, amount: number) {
    let { cart } = this.state;

    cart[id] = amount + cart[id];
    this.setState({ ...this.state, cart: cart});
    localStorage.setItem("Cart", JSON.stringify(cart));
  }

  public render(): JSX.Element {
    const { equipments } = this.state;

    return (
      <Paper>
        <Typography variant="h4">Equipment</Typography>
        <TableContainer style={{ margin: 20 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipments.map(row => {
                return <EquipmentTableRow key={row.ID} equipment={row} onAddToCart={this.addToCart} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      );
  }
}

export default IndexEquipment;
