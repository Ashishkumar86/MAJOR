import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        creatorcourseData: [],
        courseData: [],
        selectedCourse: null,
        reviewData: []
    },
    reducers: {
        setCreatorCourseData: (state, action) => {
            state.creatorcourseData = action.payload
        },
        setCourseData: (state, action) => {
            state.courseData = action.payload
        },
        setSelectedCourse: (state, action) => {
            state.selectedCourse = action.payload
        },
        setReviewData: (state, action) => { 
            state.reviewData = action.payload
        }
    }
})

export const { setCreatorCourseData, setCourseData, setSelectedCourse, setReviewData } = courseSlice.actions
export default courseSlice.reducer