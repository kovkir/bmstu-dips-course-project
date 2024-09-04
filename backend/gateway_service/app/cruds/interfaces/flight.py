from abc import ABC, abstractmethod

from enums.sort import SortFlightsShift
from schemas.flight import FlightFilter


class IFlightCRUD(ABC):
    @abstractmethod
    async def get_all_flights(
        self,
        flight_filter: FlightFilter,
        sort: SortFlightsShift = SortFlightsShift.IdAsc,
        page: int = 1,
        size: int = 100,
    ) -> list[dict]:
        pass

    @abstractmethod
    async def get_airport_by_id(
        self,
        airport_id: int,
    ) -> dict:
        pass
