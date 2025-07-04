import { appRoutePaths } from "@/routes/paths"
import { GrArticle, GrSettingsOption, GrUserAdmin, GrGallery } from "react-icons/gr"
import { LuLayoutDashboard, LuMessageSquareText, LuTickets } from "react-icons/lu";
// import { RiBarChartBoxAiLine } from "react-icons/ri";

type SidebarProps = {
    id: string
    title: string
    icon: React.ReactNode
    link: string
}

export const sideBarLinks: SidebarProps[] = [
    {
        id: '8q2s03x5068q20',
        title: 'Dashboard',
        icon: <LuLayoutDashboard />,
        link: appRoutePaths.admindashboard,
    },
    {
        id: '8q2s03x5068q21',
        title: 'Admins',
        icon: <GrUserAdmin />,
        link: appRoutePaths.adminuser,
    },
    {
        id: '8q2s03x5068q22',
        title: 'Blog Posts',
        icon: <GrArticle />,
        link: appRoutePaths.adminblogs,
    },
    {
        id: '8q2s03x5068q23',
        title: 'Gallery',
        icon: <GrGallery />,
        link: appRoutePaths.admingallery,
    },
    {
        id: '8q2s03x5068q24',
        title: 'Donations',
        icon: <LuTickets />,
        link: appRoutePaths.admindonations,
    },
    {
        id: '8q2s03x5068q25',
        title: 'Contact',
        icon: <LuMessageSquareText />,
        link: appRoutePaths.admincontact,
    },
    {
        id: '8q2s03x5068q26',
        title: 'Settings',
        icon: <GrSettingsOption />,
        link: appRoutePaths.adminsettings,
    },
    // {
    //     id: '8q2s03x5068q27',
    //     title: 'Logs',
    //     icon: <RiBarChartBoxAiLine />,
    //     link: appRoutePaths.adminlogs,
    // },
]