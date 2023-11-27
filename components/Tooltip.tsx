import { useRef, useState } from "react";
import { Button, Overlay } from "react-bootstrap"

export const Tooltip = () => {
    const [show, setShow] = useState(false);
    const target = useRef<HTMLButtonElement>(null);

    return (
        <>
            <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
                Click me to see
            </Button>
            <Overlay target={target.current} show={show} placement="left">
                {({
                    ...props
                }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                            padding: '2px 10px',
                            color: 'white',
                            marginLeft: '10px',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        Simple tooltip
                    </div>
                )}
            </Overlay>
        </>
    )
}