import { fetchBlogPosts, fetchSingleBlogPost } from '@/app/action';
import { ASSET_URL } from '@/assets';
import { TBlogItemProp, TCommentProps } from '@/types';
import dynamic from "next/dynamic"

type TPageParams = {
  params: {
    slug: string
  }
}

const PBBlogSingleContainer = dynamic(() => import('@/modules/public/pbblog/pbblogsingle/PBBlogSingleContainer'), { ssr: false });

export async function generateStaticParams() {
  const res = await fetchBlogPosts();
  if (res?.data) {
    return res.data.map(el => ({ slug: el.slug }));
  }
  else return [];
}

export async function generateMetadata({ params: { slug } }: TPageParams) {
  const res = await fetchSingleBlogPost({ slug })
  const data = res?.data as TBlogItemProp
  return {
    title: `${data?.title}'s Details`,
    description: data?.text,
    icons: ASSET_URL["anya_girlchild_logo"].src,
    openGraph: {
      type: "website",
      title: "Anya Girlchild :: Contact",
      images: data?.image ?? ASSET_URL["alms_donation"].src,
      siteName: "Anya Girlchild Foundation",
      description: data?.text,
    }
  }
}

export default async function SingleBlogPage({ params: { slug } }: TPageParams) {
  const res = await fetchSingleBlogPost({ slug })
  const data = res?.data as TBlogItemProp


  return (
    <PBBlogSingleContainer data={data} related={{ previous: res?.previous, next: res?.next }} />
  )
}
