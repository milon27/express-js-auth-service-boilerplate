const Constant = {
    DEFAULT_ROLE: "customer",
    ADMIN_ROLE: "admin",
    DEFAULT_PASSWORD: "pass123",
    PAGE_SIZE: 10,
    STRING_NUM_SPACE_PATTERN: "^[a-zA-Z0-9 _]+$",
}

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}

export default Constant
