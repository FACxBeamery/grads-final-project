/* eslint-disable max-len */
const { ObjectID } = require('mongodb');

module.exports = [
  {
    _id: ObjectID('707f1f87bcf86dd799439011'),
    title: 'Please describe your first week in few sentences',
    type: 'text',
    required: true,
    commentEnabled: true,
  },
  {
    _id: ObjectID('707f1f87bcf86dd799439021'),
    title: 'How did you feel at work this week?',
    type: 'multichoice',
    required: true,
    commentEnabled: true,
    options: ['really bad', 'bad', 'meh', 'good', 'great'],
  },
  {
    _id: ObjectID('707f1f87bcf86dd799439121'),
    title: "I see myself still working at Beamery in two years' time",
    type: 'multichoice',
    required: true,
    commentEnabled: true,
    options: [
      'strongly disagree',
      'disagree',
      'neutral',
      'agree',
      'strongly agree',
    ],
  },
  {
    _id: ObjectID('707f1f87bcf76dd789439121'),
    title: 'I am proud to work for Beamery',
    type: 'multichoice',
    required: true,
    commentEnabled: false,
    options: [
      'strongly disagree',
      'disagree',
      'neutral',
      'agree',
      'strongly agree',
    ],
  },
  {
    _id: ObjectID('707f1f87bcf76dd799439121'),
    title: 'Are there some things we are doing great here?',
    type: 'text',
    required: false,
    commentEnabled: false,
  },
  {
    _id: ObjectID('707f1f87bdf76dd799439121'),
    title: 'Are there some things we are not doing so great here?',
    type: 'text',
    required: false,
    commentEnabled: false,
  },
  {
    _id: ObjectID('707f1f87bdf76dd799539126'),
    title:
      'Is there something else you think we should have asked you in this survey?',
    type: 'text',
    required: true,
    commentEnabled: false,
  },
  {
    _id: ObjectID('707f1f87bdf76dd799439126'),
    title:
      'Is there something else you think we should have asked you in this survey?',
    type: 'text',
    required: true,
    commentEnabled: false,
  },
  {
    _id: ObjectID('707f1f87bdf76dd799439127'),
    title: 'Do you feel valued at work?',
    type: 'multichoice',
    required: false,
    commentEnabled: false,
    options: ['yes', 'no'],
  },
];
