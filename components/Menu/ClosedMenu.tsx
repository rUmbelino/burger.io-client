import { FC } from "react"
import { Button } from "react-bootstrap"

interface ClosedMenuProps {
    handleOpenMenu: () => void
}

const ClosedMenu: FC<ClosedMenuProps> = ({ handleOpenMenu }) => (
    <div className="p-2" >
        <Button variant="outline-primary" onClick={handleOpenMenu}>
            ☰
        </Button>
    </div>
)

export default ClosedMenu