from datetime import datetime as dt
from typing import Annotated

from pydantic import BaseModel, conint, constr


def convert_datetime(datetime: dt) -> str:
    return datetime.strftime("%Y-%m-%d %H:%M")


class FlightResponse(BaseModel):
    flightNumber: Annotated[str, constr(max_length=20)]
    fromAirport: str | None
    toAirport: str | None
    date: dt
    price: Annotated[int, conint(ge=1)]

    class Config:
        json_encoders = {
            dt: convert_datetime,
        }


class PaginationResponse(BaseModel):
    page: Annotated[int, conint(ge=1)]
    pageSize: Annotated[int, conint(ge=1)]
    totalElements: Annotated[int, conint(ge=0)]
    items: list[FlightResponse]
