/* eslint-disable max-len */
const ObjectID = require('mongodb').ObjectID;
module.exports = [
  {
    id: ObjectID('707f1f87bcf86dd799439011'),

    title: 'Please describe your first week in few sentences',
    type: 'text',
    required: true,
    commentEnabled: true,
  },
  {
    id: ObjectID('707f1f87bcf86dd799439021'),
    title: 'How did you feel at work this week?',
    type: 'multichoice',
    required: true,
    commentEnabled: true,
    options: [
      { text: 'really bad', position: 0 },
      { text: 'bad', position: 1 },
      { text: 'meh', position: 2 },
      { text: 'good', position: 3 },
      { text: 'great', position: 4 },
    ],
  },
  {
    id: ObjectID('707f1f87bcf86dd799439121'),
    title: "I see myself still working at B*amery in two years' time",
    type: 'multichoice',
    required: true,
    commentEnabled: true,
    options: [
      { text: 'strongly disagree', position: 0 },
      { text: 'disagree', position: 1 },
      { text: 'neutral', position: 2 },
      { text: 'agree', position: 3 },
      { text: 'strongly agree', position: 4 },
    ],
  },
  {
    id: ObjectID('707f1f87bcf76dd789439121'),
    title: 'I am proud to work for B*amery',
    type: 'multichoice',
    required: true,
    commentEnabled: false,
    options: [
      { text: 'strongly disagree', position: 0 },
      { text: 'disagree', position: 1 },
      { text: 'neutral', position: 2 },
      { text: 'agree', position: 3 },
      { text: 'strongly agree', position: 4 },
    ],
  },
  {
    id: ObjectID('707f1f87bcf76dd799439121'),
    title: 'Are there some things we are doing great here?',
    type: 'text',
    required: false,
    commentEnabled: false,
  },
  {
    id: ObjectID('707f1f87bdf76dd799439121'),
    title: 'Are there some things we are not doing so great here?',
    type: 'text',
    required: false,
    commentEnabled: false,
  },
  {
    id: ObjectID('707f1f87bdf76dd799539126'),
    title:
      'Is there something else you think we should have asked you in this survey?',
    type: 'text',
    required: true,
    commentEnabled: false,
  },
  {
    id: ObjectID('707f1f87bdf76dd799439126'),
    title:
      'Is there something else you think we should have asked you in this survey?',
    type: 'text',
    required: true,
    commentEnabled: false,
  },
  {
    id: ObjectID('707f1f87bdf76dd799439127'),
    title: 'Do you feel valued at work?',
    type: 'multichoice',
    required: false,
    commentEnabled: false,
    options: [
      { text: 'yes', position: 0 },
      { text: 'no', position: 1 },
    ],
  },
];
