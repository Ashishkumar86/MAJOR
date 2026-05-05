import Course from '../model/courseModel.js';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
dotenv.config()

export const searchWithAi = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body)
        const {input} = req.body
        if(!input){
            return res.status(400).json({message:"Search query is required"}) 
        }

        const all = await Course.find({})
        console.log("TOTAL COURSES:", all.length)
        console.log("PUBLISHED:", all.filter(c => c.isPublished).length)

        const ai = new GoogleGenAI({
            apiKey:process.env.GEMINI_API_KEY
        });

        const prompt = `You are an inteligent assistant for an LMS plateform, A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevent keyword** from the following list of the course categories and levels:
        -App Development
        -AI/ML
        -Web Development
        -Data Science
        -Data Analytics
        -Ethical Hacking
        -UI/UX DEsigning
        -others
        -HTML
        -CSS
        -Javascript
        -Beginner
        -Intermediate
        -Advanced
        
        Only reply one single keyword from the kist above that best matches the query. Do not explain anything, No extra text.
        
        Query: ${input}`
        const response = await ai.models.generateContent({
    model: "gemini-2.0-flash,
    contents: prompt,
  });

        const keyword = response.text
        const courses = await Course.find({  
            isPublished: true,
            $or: [
                {title:       {$regex: input, $options: 'i'}},
                {subTitle:    {$regex: input, $options: 'i'}},
                {description: {$regex: input, $options: 'i'}},
                {level:       {$regex: input, $options: 'i'}},
                {category:    {$regex: input, $options: 'i'}},
            ]
        });
        if(courses.length > 0){
            return res.status(200).json(courses)
        }
        else{
            const courses = await Course.find({  
            isPublished: true,
            $or: [
                {title:       {$regex: keyword, $options: 'i'}},
                {subTitle:    {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}},
                {level:       {$regex: keyword, $options: 'i'}},
                {category:    {$regex: keyword, $options: 'i'}},
            ]
        });
        return res.status(200).json(courses)
        }

        console.log("MATCHED:", courses.length)
        return res.status(200).json(courses)
    } catch (error) {
        console.log("ERROR:", error)
        return res.status(500).json({message:`Failed to Search ${error}`})
    }
}
