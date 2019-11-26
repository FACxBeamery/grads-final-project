/* eslint-disable max-len */
const ObjectID = require("mongodb").ObjectID;

module.exports = [
    {
        title: "Graduates Onboarding",
        description:
            "A survey description that is about 1 sentence long yeah blah blah",
        status: "created",
        dateCreated: 1573826615,
        dateToPublish: 1574345041,
        datePublished: "",
        dateToClose: 1576937061,
        dateClosed: "",
        anonymous: false,
        recipients: [
            {
                employeeId: ObjectID("507f1f77bcf86cd799439014"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439012"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439013"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439015"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439016"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439017"),
                completed: false
            }
        ],
        questions: [
            { questionId: ObjectID("707f1f87bcf86dd799439011"), position: 1 },
            { questionId: ObjectID("707f1f87bcf86dd799439021"), position: 2 },
            { questionId: ObjectID("707f1f87bcf86dd799439121"), position: 3 }
        ],
        responses: []
    },
    {
        title: "All employees survey",
        description:
            "A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0",
        status: "published",
        dateCreated: 1572617513,
        dateToPublish: 1574259113,
        datePublished: 1574259113,
        dateToClose: 1576851113,
        dateClosed: "",
        anonymous: true,
        recipients: [
            {
                employeeId: ObjectID("507f1f77bcf86cd799439014"),
                completed: true
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439012"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439013"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439015"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439016"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439017"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439011"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439018"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439019"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439023"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439033"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439043"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439053"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439063"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439073"),
                completed: false
            }
        ],
        questions: [
            { questionId: ObjectID("707f1f87bcf86dd799439011"), position: 1 },
            { questionId: ObjectID("707f1f87bcf86dd799439021"), position: 2 },
            { questionId: ObjectID("707f1f87bcf86dd799439121"), position: 3 },
            { questionId: ObjectID("707f1f87bcf76dd789439121"), position: 4 },
            { questionId: ObjectID("707f1f87bcf76dd799439121"), position: 5 },
            { questionId: ObjectID("707f1f87bdf76dd799439121"), position: 6 },
            { questionId: ObjectID("707f1f87bdf76dd799539126"), position: 7 },
            { questionId: ObjectID("707f1f87bdf76dd799439126"), position: 8 },
            { questionId: ObjectID("707f1f87bdf76dd799439127"), position: 9 }
        ],
        responses: [
            {
                employeeId: null,
                answers: [
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439011"),
                        answer:
                            "My first week was okay. I am just writing sentences for dummy data. Here is another sentence",
                        comment: "This is my comment on this answer"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439021"),
                        answer: "meh",
                        comment: null
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439121"),
                        answer: "strongly agree",
                        comment: "I am commenting on this question"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf76dd789439121"),
                        answer: "Hi another sentence to mock data!"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf76dd799439121"),
                        answer: "Hi another sentence to mock data! Number 2"
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439121"),
                        answer: "Hi another sentence to mock data! Number 2"
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799539126"),
                        answer: "Hi another sentence to mock data! Number 3"
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439126"),
                        answer: "Hi another sentence to mock data! Number 4"
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439127"),
                        answer: "yes"
                    }
                ]
            },
            {
                employeeId: null,
                answers: [
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439011"),
                        answer:
                            "My first week was great. I am just writing sentences for another dummy data. Here is another sentence",
                        comment: "This is my comment on this answer"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439021"),
                        answer: "good",
                        comment: null
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439121"),
                        answer: "neutral",
                        comment: "I am commenting on this question"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf76dd789439121"),
                        answer: "2nd response Hi another sentence to mock data!"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf76dd799439121"),
                        answer:
                            "2nd response Hi another sentence to mock data! Number 2"
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439121"),
                        answer:
                            "2nd response Hi another sentence to mock data! Number 2"
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799539126"),
                        answer:
                            "2nd response Hi another sentence to mock data! Number 3"
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439126"),
                        answer:
                            "2nd response Hi another sentence to mock data! Number 4"
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439127"),
                        answer: "no"
                    }
                ]
            }
        ]
    },
    {
        title: "People Team - engagement survey",
        description:
            "A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0",
        status: "closed",
        dateCreated: 1572617513,
        dateToPublish: 1574259113,
        datePublished: 1574259113,
        dateToClose: 1576851113,
        dateClosed: 1576851113,
        anonymous: true,
        recipients: [
            {
                employeeId: ObjectID("507f1f77bcf86cd799439014"),
                completed: true
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439012"),
                completed: true
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439013"),
                completed: true
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439015"),
                completed: true
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439016"),
                completed: true
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439017"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439011"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439018"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439019"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439023"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439033"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439043"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439053"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439063"),
                completed: false
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439073"),
                completed: false
            }
        ],
        questions: [
            { questionId: ObjectID("707f1f87bdf76dd799439127"), position: 0 },
            { questionId: ObjectID("707f1f87bdf76dd799439126"), position: 1 },
            { questionId: ObjectID("707f1f87bcf76dd789439121"), position: 2 },
            { questionId: ObjectID("707f1f87bcf86dd799439021"), position: 3 }
        ],
        responses: [
            {
                employeeId: ObjectID("507f1f77bcf86cd799439014"),
                answers: [
                    {
                        questionId: ObjectID("507f1f77bcf86cd799439033"),
                        answer: 1
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439126"),
                        answer: "no! im okay!"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439021"),
                        answer: 3
                    }
                ]
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439012"),
                answers: [
                    {
                        questionId: ObjectID("507f1f77bcf86cd799439033"),
                        answer: 0
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439126"),
                        answer: "no! im okay!"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439021"),
                        answer: 2
                    }
                ]
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439013"),
                answers: [
                    {
                        questionId: ObjectID("507f1f77bcf86cd799439033"),
                        answer: 0
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439126"),
                        answer: "no! im okay!"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439021"),
                        answer: 2
                    }
                ]
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439015"),
                answers: [
                    {
                        questionId: ObjectID("507f1f77bcf86cd799439033"),
                        answer: 0
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439126"),
                        answer: "no! im oapsodmnaposmx aks xpioa scxkay!"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439021"),
                        answer: 1
                    }
                ]
            },
            {
                employeeId: ObjectID("507f1f77bcf86cd799439016"),
                answers: [
                    {
                        questionId: ObjectID("507f1f77bcf86cd799439033"),
                        answer: 1
                    },
                    {
                        questionId: ObjectID("707f1f87bdf76dd799439126"),
                        answer: "no! imapiosdma sd ipkq wd !!! scxkay!"
                    },
                    {
                        questionId: ObjectID("707f1f87bcf86dd799439021"),
                        answer: 4
                    }
                ]
            }
        ]
    }
];