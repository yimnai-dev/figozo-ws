export const API_CONSTANTS = {
    MERCHANT_API_URL: 'https://api.figozo.com/Merchant/v1/api.php',
    CUSTOMER_API_URL: 'https://api.figozo.com/Customer/v1/api.php?release=development&client=web',
    ACTIONS: {
        ADD_ORDER_COMMENT: "add_order_comment"
    },
    ERRORS: [
        {
            type: "ACC_DUPLICATE",
            message: "Opps, a user exists with the credentials you inputted.",
            actions: ["logout"],
        },
        {
            type: "UNK_ERR",
            message: "Opps, Something went wrong. You can try again.",
            actions: [
                /*'show_general_error_page'*/
            ],
        },
        {
            type: "INV_CR",
            message: "<span>Opps, your credentials are not correct</span>!",
        },
        {
            type: "NOT_VERIFIED",
            message: "Opps, Your account has not been verified",
            actions: ["logout"],
        },
        {
            type: "INV_TKN",
            message: "Opps, your token is invalid",
            actions: ["logout"],
        },
        { type: "NOT_FOUND", message: "Opps!, Resource not found!", actions: [] },
        {
            type: "opFailed",
            message: "Opps!, The operation failed for some reason. Kindly try again.",
            actions: [],
        },
    ],
} as const