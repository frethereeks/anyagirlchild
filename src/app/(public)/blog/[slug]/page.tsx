export const dynamic = "force-dynamic"
import { fetchBlogPosts, fetchSingleBlogPost } from '@/app/action';
import { ASSET_URL } from '@/assets';
import PBBlogSingleWrapper from '@/modules/public/pbblog/pbblogsingle/PBBlogSingleWrapper';
import { TBlogItemProp } from '@/types';
// import { Metadata } from 'next';


type TPageParams = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const res = await fetchBlogPosts();
  if (res?.data) {
    return res.data.map(el => ({ slug: el.slug }));
  }
  else return [];
}

export async function generateMetadata({ params }: TPageParams) {
  const {slug} = params
  const res = await fetchSingleBlogPost({ slug })
  const data = res?.data as TBlogItemProp
  return {
    title: `${data?.title}'s Details`,
    description: data?.text,
    icons: ASSET_URL["anya_girlchild_logo"].src,
    openGraph: {
      type: "website",
      title: "Anya Girlchild :: Contact",
      images: [
        { url: data?.image ?? ASSET_URL["back_to_school"].src, width: 800, height: 600 },
        { url: data?.image ?? ASSET_URL["back_to_school"].src, width: 1800, height: 1600 },
      ],
      siteName: "Anya Girlchild Foundation",
      description: data?.text,
      locale: 'en_US',
    }
  }
}

export default async function SingleBlogPage({ params }: TPageParams) {
  const {slug} = params
  const res = await fetchSingleBlogPost({ slug })
  const data = res?.data as TBlogItemProp

  return (
    <PBBlogSingleWrapper key={"x22qpyci38404"} result={{ data, previous: res?.previous, next: res?.next}} />
  )
}
