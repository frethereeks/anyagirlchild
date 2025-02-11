type TDashLayoutProps = {
    children: React.ReactNode | React.ReactNode[]
}

type TAdminRole = "Root" | "Admin"
type TMessageStatus = "Read" | "Unread"
type TStatus = "Active" | "Pending" | "Disabled"
type TTransactionStatus = "Success" | "Failed" | "Pending"

type TAdminProps = {
    id: string
    firstname: string
    lastname: string
    image: string
    password: string
    email: string
    address?: string
    lastLogin: Date
    role: TAdminRole
    status: TStatus
    createdAt: Date
    updatedAt: Date
}

type TContactProps = {
    id: string
    fullname: string
    email: string
    status: TMessageStatus
    message: string
    createdAt: Date
    updatedAt: Date
}

type TDonationProps = {
    id: string
    fullname: string
    amount: number
    status: TTransactionStatus
    purpose: string
    createdAt: Date
    updatedAt: Date
}
