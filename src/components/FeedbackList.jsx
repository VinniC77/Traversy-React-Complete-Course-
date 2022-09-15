import FeedbackItem from "./FeedbackItem"

const FeedbackList = ({ feedback }) => {
    // console.log(feedback); Always check if the data is correct
    if (!feedback || feedback.length === 0){
        return <p>No Feedback Yet</p>
    }

    return (
        <div className="feedback-list">
            {feedback.map((item) => (
                <FeedbackItem key={item.id} item={item}/>
            ))}
        </div>
    )
}

export default FeedbackList