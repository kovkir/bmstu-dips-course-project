from fastapi import HTTPException, status
from utils.enums import BadRequestErrorTextEnum, LoginErrorTextEnum


class NotFoundException(HTTPException):
    def __init__(
        self,
        prefix: str,
        headers: dict[str, str] | None = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{prefix}: объекта с таким uid не существует",
            headers=headers,
        )


class ConflictException(HTTPException):
    def __init__(
        self,
        prefix: str,
        headers: dict[str, str] | None = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"{prefix}: объект с таким(и) атрибутом(ами) уже существует",  # noqa: E501
            headers=headers,
        )


class NotAuthorizedException(HTTPException):
    def __init__(
        self,
        error_in: LoginErrorTextEnum,
        headers: dict[str, str] | None = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Не авторизован: {error_in}",
            headers=headers,
        )


class BadRequestException(HTTPException):
    def __init__(
        self,
        error_in: BadRequestErrorTextEnum,
        detail: str,
        headers: dict[str, str] | None = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка данных: {error_in} ({detail})",
            headers=headers,
        )


class ForbiddenException(HTTPException):
    def __init__(
        self,
        headers: dict[str, str] | None = None,
    ) -> None:
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Запрещено: Нет доступа",
            headers=headers,
        )
