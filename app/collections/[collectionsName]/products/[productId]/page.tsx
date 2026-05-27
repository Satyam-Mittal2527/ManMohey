export default async function productDetails({
    params,
}:{
    params : Promise<{productId: string}>;
}) {
    const {productId} = await params;
    return <h1>Info about ProductId {productId}</h1>
}