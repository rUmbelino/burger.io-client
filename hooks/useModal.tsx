import { FC, PropsWithChildren, ReactNode, useState } from "react"
import { Form, Modal } from "react-bootstrap"

interface UseModalProps {
    show: boolean,
    title: string,
    footer?: ReactNode
    handleClose: () => void
}

export const useModal = (props: UseModalProps) => {
    const { show, title, footer, handleClose } = props


    const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            {footer && (
                <Modal.Footer>
                    {footer}
                </Modal.Footer>
            )}
        </Modal>
    )

    return {
        Wrapper
    }
}