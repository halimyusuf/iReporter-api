const users = [{
  id: 1,
  firstname: 'halim',
  lastname: 'Olamilekan',
  othernames: 'yusuf',
  email: 'haleemyoosuph@gmail.com',
  phoneNumber: '07035508581',
  username: 'halimyusuf',
  registered: Date(),
  isAdmin: true,
}];

const AllRedflag = [
  {
    id: 1,
    title: 'This is a title',
    story: 'This is the story of the title',
    createdOn: Date(),
    createdBy: 1,
    type: 'red-flag',
    location: '23.535 , 45.255',
    status: 'approved',
    images: ['Image', 'Image'],
    video: ['Image', 'Image'],
    comment: 'This is america!',
  },
];


exports.users = users
exports.AllRedflag = AllRedflag