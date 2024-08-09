from pydantic import BaseModel
from schemas.bonus import PrivilegeShortInfo
from schemas.ticket import TicketResponse


class UserInfoResponse(BaseModel):
    tickets: list[TicketResponse]
    privilege: PrivilegeShortInfo | dict[None, None]
