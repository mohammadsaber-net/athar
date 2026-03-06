import { v2 as cloudinary } from 'cloudinary';
export const isAdmin=async()=>{
try {
  const res=await fetch(`/api/users/admin`)
  const data=await res.json()
  if(!data.user || data.user.role!=="admin"){
    return false
  }
  return true    
} catch (error) {
    return false   
}
 }
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string, 
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
    secure: true,
});
export default cloudinary;

