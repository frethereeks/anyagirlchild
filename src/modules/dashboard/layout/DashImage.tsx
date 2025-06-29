import { ASSET_URL } from '@/assets'
import { authOptions } from '@/lib';
import { getServerSession } from 'next-auth'
import Image from 'next/image'

export default async function DashImage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    return (
        <>
            <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 relative bg-primary rounded-full overflow-hidden">
                <Image src={user?.image ?? ASSET_URL["little_child"].src} alt='User Image' className="absolute left-0 top-0 h-full w-full rounded-md object-cover flex-shrink-0" fill priority />
            </div>
        </>
    )
}
