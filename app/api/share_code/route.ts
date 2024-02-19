import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { codeSnippet } from "../Schemas";
//import 'dotenv/config';


export async function POST(request: Request){
    try {
        let mongo_uri:string | undefined = process.env.MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri);
        }
       
         let data = await request.json();

        if(data.newCode === true){
            let newCodeSnippet = new codeSnippet({
                id: data.id,
                code: data.code,
                language: data.language,
            })
    
            await newCodeSnippet.save();
            return NextResponse.json({"msg": `https://code-sharing-rho.vercel.app/share/${data.id}`}, {status: 200});
        } else {
                
            const filter = {id: data.id};
            const update = {code: data.code, language: data.language};
            let query = await codeSnippet.findOneAndUpdate(filter, update, {
                new: true
            });

            await query.save();
            return NextResponse.json({"msg": 'Code Saved'}, {status: 200});
        }
        
        

    } catch (error) {

        
        console.log(process.env.MONGO_URI);
        console.log(error);
        
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}
