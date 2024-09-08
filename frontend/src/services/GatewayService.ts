import { $apiGateway } from "./AxiosInstances";
import { ITicketResponse } from "../interfaces/Ticket/ITicketResponse";
import { IBuyTicket } from "../interfaces/Ticket/IBuyTicket";
import { IUserInfo } from "../interfaces/User/IUserInfo";


export default class GatewayService {
  static async buyTicket(buyTicket: IBuyTicket) {
    try {
      const response = await $apiGateway.post<ITicketResponse>(
        '/tickets',
        buyTicket
      );
      return response.data;
    } catch {
      return null;
    }
  };

  static async getUserInformation() {
    try {
      const response = await $apiGateway.get<IUserInfo>('/me');
      return response.data;
    } catch {
      return null;
    }
  };
}
