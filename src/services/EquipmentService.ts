class EquipmentService {
  ID: number
  Name: string
  TypeID: number

  constructor(data: any) {
    this.ID = data.ID;
    this.Name = data.Name;
    this.TypeID = data.TypeID;
  }

  static async GetAll(): Promise<EquipmentService[]> {
    const response = await fetch('https://localhost:44339/api/equipment/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    let equipments: EquipmentService[] = [];

    for (const equipment of await response.json()) {
      equipments.push(new EquipmentService(equipment));
    }
    
    return equipments;
  }
}

export default EquipmentService;
