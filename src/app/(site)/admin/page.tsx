import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const Admin = () => redirect('/admin/blog')

export default Admin
