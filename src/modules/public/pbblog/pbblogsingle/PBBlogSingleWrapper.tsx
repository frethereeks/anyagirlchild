"use client"
import { TBlogItemProp } from "@/types";
import dynamic from "next/dynamic"
const PBBlogSingleContainer = dynamic(() => import('@/modules/public/pbblog/pbblogsingle/PBBlogSingleContainer'), { ssr: false });

type TRelatedPostProps = {
    id: string;
    title: string;
    slug: string;
    image: string | null;
} | null | undefined

export default function PBBlogSingleWrapper({ result }: { result: { data: TBlogItemProp, previous: TRelatedPostProps, next: TRelatedPostProps } }) {
  return (
      <PBBlogSingleContainer data={result.data} related={{ previous: result?.previous, next: result?.next }} />
  )
}
