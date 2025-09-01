import CollectionPage from "@/components/view/CollectionPage/collectionPage";

export default async function Page({ params }: { params: { handle: string } }) {
    const param = await params
  
  return <CollectionPage handle={param.handle} />;
}
