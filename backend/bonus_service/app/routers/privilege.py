from typing import Annotated

from cruds.interfaces.privilege import IPrivilegeCRUD
from cruds.privilege import PrivilegeCRUD
from enums.responses import RespPrivilegeEnum
from enums.status import PrivilegeStatus
from fastapi import APIRouter, Depends, Query, status
from fastapi.responses import Response
from models.privilege import PrivilegeModel
from schemas.privilege import (
    Privilege,
    PrivilegeCreate,
    PrivilegeFilter,
    PrivilegeUpdate,
)
from services.privilege import PrivilegeService
from sqlalchemy.orm import Session
from utils.database import get_db


def get_privilege_crud() -> type[IPrivilegeCRUD]:
    return PrivilegeCRUD


router = APIRouter(
    prefix="/privileges",
    tags=["Privilege REST API operations"],
    responses={
        status.HTTP_400_BAD_REQUEST: RespPrivilegeEnum.InvalidData.value,
    },
)


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=list[Privilege],
    responses={
        status.HTTP_200_OK: RespPrivilegeEnum.GetAll.value,
    },
)
async def get_all_privileges(  # noqa: PLR0913
    db: Annotated[Session, Depends(get_db)],
    privilegeCRUD: Annotated[IPrivilegeCRUD, Depends(get_privilege_crud)],
    username: Annotated[str | None, Query(max_length=80)] = None,
    status: PrivilegeStatus | None = None,
    page: Annotated[int, Query(ge=1)] = 1,
    size: Annotated[int, Query(ge=1)] = 100,
) -> list[PrivilegeModel]:
    return await PrivilegeService(
        privilegeCRUD=privilegeCRUD,
        db=db,
    ).get_all(
        privilege_filter=PrivilegeFilter(
            username=username,
            status=status,
        ),
        page=page,
        size=size,
    )


@router.get(
    "/{privilege_id}/",
    status_code=status.HTTP_200_OK,
    response_model=Privilege,
    responses={
        status.HTTP_200_OK: RespPrivilegeEnum.GetByID.value,
        status.HTTP_404_NOT_FOUND: RespPrivilegeEnum.NotFound.value,
    },
)
async def get_privilege_by_id(
    db: Annotated[Session, Depends(get_db)],
    privilegeCRUD: Annotated[IPrivilegeCRUD, Depends(get_privilege_crud)],
    privilege_id: int,
) -> PrivilegeModel:
    return await PrivilegeService(
        privilegeCRUD=privilegeCRUD,
        db=db,
    ).get_by_id(privilege_id)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_class=Response,
    responses={
        status.HTTP_201_CREATED: RespPrivilegeEnum.Created.value,
        status.HTTP_409_CONFLICT: RespPrivilegeEnum.Conflict.value,
    },
)
async def create_new_privilege(
    db: Annotated[Session, Depends(get_db)],
    privilegeCRUD: Annotated[IPrivilegeCRUD, Depends(get_privilege_crud)],
    privilege_create: PrivilegeCreate,
) -> Response:
    privilege = await PrivilegeService(
        privilegeCRUD=privilegeCRUD,
        db=db,
    ).add(privilege_create)

    return Response(
        status_code=status.HTTP_201_CREATED,
        headers={"Location": f"/api/v1/privilege_histories/{privilege.id}"},
    )


@router.delete(
    "/{privilege_id}/",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    responses={
        status.HTTP_204_NO_CONTENT: RespPrivilegeEnum.Delete.value,
        status.HTTP_404_NOT_FOUND: RespPrivilegeEnum.NotFound.value,
    },
)
async def remove_privilege_by_id(
    db: Annotated[Session, Depends(get_db)],
    privilegeCRUD: Annotated[IPrivilegeCRUD, Depends(get_privilege_crud)],
    privilege_id: int,
) -> Response:
    await PrivilegeService(
        privilegeCRUD=privilegeCRUD,
        db=db,
    ).delete(privilege_id)

    return Response(
        status_code=status.HTTP_204_NO_CONTENT,
    )


@router.patch(
    "/{privilege_id}/",
    status_code=status.HTTP_200_OK,
    response_model=Privilege,
    responses={
        status.HTTP_200_OK: RespPrivilegeEnum.Patch.value,
        status.HTTP_404_NOT_FOUND: RespPrivilegeEnum.NotFound.value,
    },
)
async def update_privilege_by_id(
    db: Annotated[Session, Depends(get_db)],
    privilegeCRUD: Annotated[IPrivilegeCRUD, Depends(get_privilege_crud)],
    privilege_id: int,
    privilege_update: PrivilegeUpdate,
) -> PrivilegeModel:
    return await PrivilegeService(
        privilegeCRUD=privilegeCRUD,
        db=db,
    ).patch(privilege_id, privilege_update)
