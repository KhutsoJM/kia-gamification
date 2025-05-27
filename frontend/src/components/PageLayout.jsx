import { Box } from "@mui/material"
import Navbar from "./UI/Navbar"
import { Outlet } from "react-router-dom"


const PageLayout = ({ hasNavbar, children }) => {
    hasNavbar ? console.log('This has a navbar') : console.log('this page should not have a navbar')
    return (
        <Box sx={{
            paddingTop: hasNavbar ? '56px' : '',
        }}>
            {hasNavbar && <Navbar />}
            <Outlet />
        </Box>
    )
}

export default PageLayout
