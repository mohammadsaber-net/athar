import  jwt  from "jsonwebtoken"
import { NextRequest } from "next/server"
export async function GET(req:NextRequest){
    try{
    const token=req.cookies.get("token")?.value
    if(!token){
        return Response.json({user:null})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY!) as any
    return Response.json({
        user:{
            email:decoded.email,
            id:decoded.id,
            role:decoded.role
        }
    })
    } catch (error) {
    return Response.json(
      { user: null },
      { status: 401 }
    );
  }
}