// these are the collection names inside the database that we are storing here and making it accessible throughout the application so that we can prevent typos and change the variable name to like everywhere at once wherever we are using this at once from here, this makes the code clean and more maintainable

export const db = "main-questioncall"
export const questionCollection = "questions"
export const answerCollection = "answers"
export const commentCollection = "comments"
export const voteCollection = "votes"
export const questionAttachmentBucket = "question-attachment"