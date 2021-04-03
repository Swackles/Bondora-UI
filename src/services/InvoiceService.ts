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

  constructor(input: any) {
    this.LoyaltyPoints = input.LoyaltyPoints
    this.Sum = input.Sum
    this.Items = []
    
    for (const item of input.Items) {
      this.Items.push({
        Equipment: new EquipmentService(item.Equipment),
        DaysRented: item.DaysRented,
        LoyaltyPoints: item.LoyaltyPoints,
        Price: item.Price
      })
    }
  }

  static async GetInvoice(input: any): Promise<InvoiceService | null> {
    if (input == null) return null;

    const response = await fetch('https://localhost:44339/api/invoice/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: input
    });

    const JSONresponse = await response.json();
    if (JSONresponse == null) return null;

    return new InvoiceService(JSONresponse);
  }
}

export default InvoiceService;