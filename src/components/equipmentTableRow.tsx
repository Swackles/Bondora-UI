import React from "react";
import Equipment from './../services/EquipmentService';
import { Add, Remove, ShoppingCart } from '@material-ui/icons';
import { TableRow, TableCell, Button, TextField, SvgIcon } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles';

interface Input {
  classes: any
  equipment: Equipment
  onAddToCart: (id: number, amount: number) => void
}

interface State {
  amount: number
}

const classes: Styles<Theme, {}> = (theme: Theme) => ({
  table: {
    '& tr, & td': {
      borderBottom: 'none'
    }
  },
  tdAlignTop: {
    verticalAlign: 'top'
  },
  quantitySelector: {
    border: '1px solid #ced4da',
    width: '11.7rem',
    borderRadius: '.25rem',
    '& button': {
      paddingRight: '0px',
      paddingLeft: '0px'
    },
    '& .MuiTextField-root': {
      maxWidth: '3.5rem',
      margin: '0px'
    },
    '& .MuiTextField-root .MuiOutlinedInput-root fieldset': {
      borderTop: '0px',
      borderBottom: '0px',
      borderRadius: '0px'
    },
    '& .MuiTextField-root .MuiOutlinedInput-root .MuiInputBase-input': {
      padding: '8px'
    }
  }
});

class IndexEquipment extends React.Component<Input, State> {
  constructor(input: Input | Readonly<Input>) {
    super(input);

    this.state = {
      amount: 1
    };

    this.decreseAmount = this.decreseAmount.bind(this);
    this.addAmount = this.addAmount.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  private addAmount() {
    this.setState({
      amount: this.state.amount + 1
    })
  }

  private decreseAmount() {
    if (this.state.amount > 1) {
      this.setState({
        amount: this.state.amount - 1
      })
    }
  }

  private addToCart() {
    const { onAddToCart, equipment: { ID } } = this.props
    const { amount } = this.state;

    onAddToCart(ID, amount);
  }

  public render(): JSX.Element {
    const { amount } = this.state;
    const { classes, equipment: { Name } } = this.props

    return (
      <TableRow>
        <TableCell>{Name}</TableCell>
        <TableCell className={classes.tdAlignTop}>
          <div className={classes.quantitySelector}>
            <Button size="medium" onClick={this.addAmount}><Add /></Button>
            <TextField margin="dense" type="number" fullWidth={false} variant="outlined" value={amount} />
            <Button size="medium" onClick={this.decreseAmount}><Remove /></Button>
          </div>
        </TableCell>
        <TableCell>
          <Button onClick={this.addToCart} variant="contained" color="primary">
            <SvgIcon component={ShoppingCart} /> Lisa ostukorvi
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(classes, { withTheme: true })(IndexEquipment);
