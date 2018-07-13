const users = [{id:1,
                name:'bill',
                schoolId:101},
               {id:2,
                name:'ywt',
                schoolId:102},
                {id:1,
                name:'hsr',
                schoolId:101}];

const grades = [{id:1,
                 schoolId:101,
                 grade:80},
                 {id:2,
                 schoolId:102,
                 grade:98},
                 {id:3,
                 schoolId:101,
                 grade:86}];

const getUser = (id) => {
  return new Promise((resolve,reject) => {
    var user = users.find((user) => user.id === id);
    if(!user){
     return reject(`Unable to find user with id = ${id}`);
    }

    resolve(user);
  });
};

getUser(2).then((user) => {
  console.log(user);
}).catch((e) => {
  console.log(e);
});

const getGrades = (schoolId) => {
  return new Promise((resolve,reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

getGrades(101).then((grades) => {
  console.log(grades);
});

const getStatus = (userId) => {
  var user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    var average = 0;
    if(grades.length > 0){
      average = grades.map((grade) => 
          grade.grade).reduce((a,b) => {return a+b;})/grades.length;
    }

    return `${user.name} has a ${average}% in the class`;
  });
};

getStatus(1).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});

const getStatusAlt = async (userId) => {
  var user = await getUser(userId);
  var grades = await getGrades(user.schoolId);
  
  var average = 0;

  if(grades.length > 0){
    average = grades.map((grade) => grade.grade)
              .reduce((a,b) => {return a + b;}) / grades.length;
  }

  return `${user.name} has a ${average}% in the class`;
};

getStatusAlt(2).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});
