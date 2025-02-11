type TDashLayoutProps = {
    children: React.ReactNode | React.ReactNode[]
}

type TAdminProps = {
    id: string
    firstname: string
    lastname: string
    image: string
    password: string
    email: string
    lastLogin: Date
    role: "Root" | "Admin"
    status: "Active" | "Pending" | "Disabled"
    createdAt: Date
    updatedAt: Date
}

type TDonationProps = {
    id: string
    fullname: string
    amount: number
    status: "success" | "failed" | "pending"
    purpose: string
    createdAt: Date
    updatedAt: Date
}