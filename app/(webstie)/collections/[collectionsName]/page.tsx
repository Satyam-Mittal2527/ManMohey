export default async function Collection({ 
    params, 
}:{
    params : Promise<{collectionsName: string}>;
}){
    const collectionName = (await params).collectionsName;
    return <h1>Product details {collectionName}</h1>
}