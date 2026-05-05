import Course from "../model/courseModel.js"
import Review from "../model/reviewModel.js"

export const createReview = async (req, res) => {
    try {
        const { rating, comment, courseId } = req.body
        const userId = req.userId

        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ message: "Course is not found" })
        }

        const alreadyReviewed = await Review.findOne({ course: courseId, user: userId })
        if (alreadyReviewed) {
            return res.status(400).json({ message: "You have already reviewed this course" })
        }

        const review = new Review({
            course: courseId,
            user: userId,
            rating,
            comment
        })
        await review.save()

        course.reviews.push(review._id)
        await course.save()

        return res.status(201).json(review)

    } catch (error) {
        return res.status(500).json({ message: `failed to create review ${error}` })
    }
}

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate({ path: "user", select: "name photoUrl role description" })  
            .populate({ path: "course", select: "title" })                          
            .sort({ createdAt: -1 })
        return res.status(200).json(reviews)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `failed to get review ${error}` })
    }
}