import { FC } from "react"
import { Alert } from "react-bootstrap"

interface ErrorProps {
    message?: string
}

const DEFALT_MESSAGE = 'An unexpected errror occured while sending the request!'

export const Error: FC<ErrorProps> = ({ message = DEFALT_MESSAGE }) => (
    <Alert variant="danger">
        <h4>Ooops...</h4>
        <p>{message}</p>
    </Alert>
)