const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function Get_Home_page_Hero(){
    try{
        console.log(baseUrl);
        const response = await fetch(`${baseUrl}/api/Home/PageHero`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            },
        });
        console.log(response);
        if(response){
            const data = await response.json();
            console.log("Home page hero data:", data);
            return data;
        }
    }
    catch(error){
        console.error("Error fetching home page hero data:", error);
        return null;
    }
}