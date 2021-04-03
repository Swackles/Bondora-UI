import EquipmentService from './EquipmentService';

interface IItem {
  Equipment: EquipmentService
  DaysRented: number
  LoyaltyPoints: number
  Price: number 
}

class InvoiceService {
  Items: IItem[]
  LoyaltyPoints: number
  Sum: number
  InvoiceString: string

  constructor(input: any) {
    this.LoyaltyPoints = input.LoyaltyPoints
    this.Sum = input.Sum
    this.Items = []
    this.InvoiceString = input.InvoiceString
    
    for (const item of input.Items) {
      this.Items.push({
        Equipment: new EquipmentService(item.Equipment),
        DaysRented: item.DaysRented,
        LoyaltyPoints: item.LoyaltyPoints,
        Price: item.Price
      })
    }
  }

  static async GetInvoice(input: string): Promise<InvoiceService | null> {
    const response = await fetch('https://localhost:44339/api/invoice/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: input
    });

    const JSONresponse = await response.json();
    if (JSONresponse == null) return null;

    return new InvoiceService({ ...JSONresponse, InvoiceString: input});
  }

  async Print(): Promise<string | null> {
    const response = await fetch('https://localhost:44339/api/invoice/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: this.InvoiceString
    });

    return response.text();
  }
}

export default InvoiceService;