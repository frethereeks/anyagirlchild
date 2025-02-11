import { appRoutePaths } from "@/routes/paths"
import { GrSettingsOption, GrUserAdmin, GrUserSettings, GrUserWorker } from "react-icons/gr"
import { LuCamera, LuGalleryHorizontal, LuGalleryHorizontalEnd, LuGalleryThumbnails, LuGalleryVertical, LuLayoutDashboard, LuMessageSquareText, LuScrollText, LuTickets, LuUtensilsCrossed } from "react-icons/lu";

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
        link: appRoutePaths.adminadmin,
    },
    {
        id: '8q2s03x5068q22',
        title: 'Blog Posts',
        icon: <LuScrollText />,
        link: appRoutePaths.adminblogs,
    },
    {
        id: '8q2s03x5068q23',
        title: 'Gallery',
        icon: <LuGalleryVertical />,
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
]