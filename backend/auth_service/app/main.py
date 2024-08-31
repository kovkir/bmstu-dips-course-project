import uvicorn
from controller.api import controller as api_contoller
from exceptions.handlers import (
    http_exception_handler,
    request_validation_exception_handler,
)
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.openapi.utils import get_openapi
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from utils.database import create_tables
from utils.jwks import auth_jwk
from utils.settings import settings


def custom_openapi() -> dict:
    if not app.openapi_schema:
        app.openapi_schema = get_openapi(
            title=app.title,
            version=app.version,
            openapi_version=app.openapi_version,
            description=app.description,
            terms_of_service=app.terms_of_service,
            contact=app.contact,
            license_info=app.license_info,
            routes=app.routes,
            tags=app.openapi_tags,
            servers=app.servers,
        )
        for method_item in app.openapi_schema.get("paths").values():
            for param in method_item.values():
                responses = param.get("responses")
                if "422" in responses:
                    del responses["422"]

        del app.openapi_schema["components"]["schemas"]["HTTPValidationError"]
        del app.openapi_schema["components"]["schemas"]["ValidationError"]

    return app.openapi_schema


create_tables()

app = FastAPI(
    title="Auth Service",
    version="v1",
)
app.include_router(api_contoller, prefix="/api/v1")
app.openapi = custom_openapi


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    return await http_exception_handler(request, exc)


@app.exception_handler(RequestValidationError)
async def custom_validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    return await request_validation_exception_handler(request, exc)


if __name__ == "__main__":
    auth_jwk.generate_jwks()
    uvicorn.run(
        "main:app",
        host=settings.options.service.host,
        port=settings.options.service.port,
        log_level=settings.options.service.log_level,
        reload=settings.options.service.reload,
    )
