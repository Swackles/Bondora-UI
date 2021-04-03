import React from "react";
import Invoice from '../../services/InvoiceService';
import CartTableRow from './../../components/cartTableRow';
import { Button, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Typography } from '@material-ui/core';

interface State {
  invoice: Invoice | null
}

class IndexCart extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      invoice: null,
    }

    this.removeFromCart = this.removeFromCart.bind(this);
    this.loadCart = this.loadCart.bind(this);
    this.print = this.print.bind(this);
  }

  public componentDidMount() {
    this.loadCart();
  }

  private removeFromCart(id: number) {
    const JSONcart = localStorage.getItem("Cart");
    if (JSONcart == null) return;

    let localCart = JSON.parse(JSONcart);
    delete localCart[id];

    localStorage.setItem("Cart", JSON.stringify(localCart));
    this.loadCart();
  }

  private loadCart() {
    const localCart = localStorage.getItem("Cart");

    if (localCart) {
      Invoice.GetInvoice(localCart).then(value => {
        this.setState({ ...this.state, invoice: value });
      });
    }
  }

  private print() {
    this.state.invoice?.Print().then((text) => {
      if (text == null) return;
      var element = document.createElement('a');
      text = text.replaceAll('\\n', '\n');
      text = text.replaceAll('"', '');
      
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
      element.setAttribute('download', 'Invoice.txt');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    });
  }

  public render(): JSX.Element {
    const { invoice } = this.state;

    return (
      <Paper>
        <Typography variant="h4">Invoice</Typography>
        <TableContainer style={{ margin: 20 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Days rented for</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice?.Items.map(item => <CartTableRow key={item.Equipment.ID}onRemoveFromCart={this.removeFromCart} item={item}/>)}
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Sum:</TableCell>
                <TableCell align="left">{invoice?.Sum}</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Loyalty Points:</TableCell>
                <TableCell align="left">{invoice?.LoyaltyPoints}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button onClick={this.print}>Print</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    ) 
  }
}

export default IndexCart;
