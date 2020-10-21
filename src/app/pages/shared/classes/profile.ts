export class Profile {
    cedula: number;
    name: string;
    lastName: string;
    province: string;
    canton: string;
    district: string;
    address: string;
    phoneN: number;
    userName: string;
    birthDate: string;
    notifications: {
      producerID: number,
      clientID: number,
      message: string,
      ID: number
    }[]
}