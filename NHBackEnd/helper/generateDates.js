const moment = require('moment')
const db = require('../data/index')

const generateSingleDate = (start, end, day) => {
  var result = []
  var current = moment(start)

  while (current.day(7 + day).isBefore(end)) {
    result.push(current.clone())
  }

  return result
}

// where sunday is 0 and saturday is 6
const generateDates = (start, end, days) => {
  var result = []
  for (let weekday of days) {
    generateSingleDate(start, end, weekday).forEach(date => {
      result.push(date)
    })
  }
  return result
}

const insertRecurringReminder = async () => {
  let sql = `INSERT INTO RECURRINGREMINDER
  (PatientID, StartDate, EndDate, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) 
  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  const results = await db
    .promise()
    .query(sql, [
      3,
      '2020-02-27',
      '2020-02-27',
      true,
      true,
      true,
      true,
      true,
      true,
      true
    ])

  console.log(results)
}

// module.exports = generateDates;
console.log(generateDates('2022-03-23', '2022-04-23', [0, 3, 4]))

// insertRecurringReminder();