import { fetchBlogPosts, fetchSingleBlogPost } from '@/app/action';
import PBBlogSingleContainer from '@/modules/public/pbblog/pbblogsingle/PBBlogSingleContainer';
import { TBlogItemProp } from '@/types';

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

export async function generateMetadata({ params: { slug } }: TPageParams) {
  const res = await fetchSingleBlogPost({ slug })
  const data = res?.data as TBlogItemProp
  return {
    title: `${data?.title}'s Details`,
    description: data?.text,
  }
}

export default async function SingleBlogPage({ params: { slug } }: TPageParams) {
  const res = await fetchSingleBlogPost({slug})
  const data = res?.data as TBlogItemProp

  return (
    <PBBlogSingleContainer data={data} />
  )
}
