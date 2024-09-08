import { $apiGateway } from "./AxiosInstances";
import { ITicketResponse } from "../interfaces/Ticket/ITicketResponse";
import { IBuyTicket } from "../interfaces/Ticket/IBuyTicket";
import { IUserInfo } from "../interfaces/User/IUserInfo";


export default class GatewayService {
  static async buyTicket(buyTicket: IBuyTicket) {
    try {
      return await $apiGateway.post<ITicketResponse>('/tickets', buyTicket);
    } catch {
      return null;
    }
  };

  static async ticketRefund(ticketUid: string) {
    try {
      return await $apiGateway.delete(`/tickets/${ticketUid}`);
    } catch {
      return null;
    }
  };

  static async getUserInformation() {
    try {
      return await $apiGateway.get<IUserInfo>('/me');
    } catch {
      return null;
    }
  };
}
