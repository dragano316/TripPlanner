export const nameConfig = {
    rules: [
        {
            required: true,
            message: 'Please input your Name!',
        },
        {pattern: '^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$', message: "Please input name >= 3 letters!"}
    ]
}

export const emailConfig = {
    rules: [
        {
            required: true,
            message: 'Please input your Email!',
        },
        {
            pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: 'Please enter valid email'
        }
    ]
}

export const passwordConfig = {
    rules: [
        {
            required: true,
            message: 'Please input your Password!',
        },
        {pattern: '^[a-zA-Z0-9@#$%^&*()!~.,;:]{3,}', message: "Please input password >= 3 characters!"}
    ]
}

export const roleConfig = {
    rules: [
        {
            required: true,
            message: 'Role is required!',
        }
    ]
}
export const destinationConfig = {
    rules: [
        {
            required: true,
            message: 'Please input destination!',
        },
        {pattern: '^[a-zA-Z0-9]{3,}(?: [a-zA-Z]*){0,10}$', message: "Please input destination >= 3 letters!"}
    ]
}

export const commentConfig = {
    rules: [
        {
            required: true,
            message: 'Please input comment!',
        },
        {pattern: '.{10,}', message: "Please input destination >= 10 letters!"}
    ]
}
