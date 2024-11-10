import RandomCard from "@/components/RandomCard";
import { api } from "@/lib/axios";
import { ImageB, Favourite, Breed } from "@/types/Image.interface";

async function loadImages() {
  try {
    const { data } = await api.get<ImageB[]>("/images/search?limit=20");
    await  new Promise((resolve)=> setTimeout(resolve, 3000))
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function RandomPage() {
  const images: ImageB[] | undefined = await loadImages();

  return (
    <div className="mx-auto max-w-fit justify-between items-center">
  <h1>
    Dogs at random</h1>
      
  
    <div className="grid  xs:grid-cols-1 md:grid-cols-3 sm:grid-cols-2  lg:grid-cols-4 gap-3 w-full  ">
        {images?.map(
          (image, index) => image && <RandomCard image={image} key={image.id} />
        )}
      </div>
    </div>
  );
}

export default RandomPage;
