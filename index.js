//create employee record, test cases

let submitArray = [
    ["Eric", "Song", "Engineer", 25], ["Julius", "Caesar", "General", 27]
]

let employeesMax = createEmployeeRecords(submitArray) //Submitting example employee record
let eric = employeesMax["0"]
let julius = employeesMax["1"]

console.log(eric)

console.log(" ")

console.log(julius)

console.log(" ")

julius = createTimeInEvent(julius, "0044-03-14 0900")
julius = createTimeOutEvent(julius, "0044-03-14 2100")
julius = createTimeInEvent(julius, "0044-03-15 0900")
julius = createTimeOutEvent(julius, "0044-03-15 1100")

eric = createTimeInEvent(eric, "2000-12-01 0700")
eric = createTimeOutEvent(eric, "2000-12-01 1400")
eric = createTimeInEvent(eric, "2000-12-05 0700")
eric = createTimeOutEvent(eric, "2000-12-05 1400")
eric = createTimeInEvent(eric, "2000-11-01 0700")
eric = createTimeOutEvent(eric, "2000-11-01 1400")
eric = createTimeInEvent(eric, "2001-01-05 0700")
eric = createTimeOutEvent(eric, "2001-01-05 1400")

allWagesFor(eric)
allWagesFor(julius)

let employeesNow = [eric, julius]

console.log("hello?")

calculatePayroll(employeesNow)

//End test cases


//Functions for handling records

function createEmployeeRecord(array) {
    //Takes 4 element Array of firstName, familyName, title and payrate per hour
    //Returns an object with keys: firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents
    //behavior of this function is to load array elements into the corresponding keys in the Object. 
    //Additionally, it should initialize empty arrays on properties timeInEvents and timeOutEvents

    // console.log(array)

    let newObj = {}

    newObj.firstName = array[0]
    newObj.familyName = array[1]
    newObj.title = array[2]
    newObj.payPerHour = array[3]
    newObj.timeInEvents = []
    newObj.timeOutEvents = []

    // console.log(newObj)
    return newObj
}

function createEmployeeRecords(aOfArrays) {
    //argument: array of arrays
    //returns array of objects (made using createEmployeeRecord)
    //Converts each nested array into an employee record then puts it into a new array
    let empRecords = aOfArrays.map(createEmployeeRecord)
    //Uses createEmployeeRecord function on every element (array) inside the employee record array
    // console.log(empRecords)
    return empRecords
}

function createTimeInEvent(object, dateStamp) {
    //Argument: the employee object in question, a date stamp "YYYY-MM-DD HHMM"
    //returns Employee Record (object)
    //Add an object with keys to the timeInEvents Array on record Object: [type (TimeIn), hour, date]

    let date = dateStamp.split(" ")
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(date[1]),
        date: date[0]
    }

    let newObj = Object.assign({}, object)
    newObj.timeInEvents[newObj.timeInEvents.length] = timeIn
    return newObj

    //Mutates original object by adding the new information
    // object.timeInEvents[object.timeInEvents.length] = timeIn
    // return object

}

function createTimeOutEvent(object, dateStamp) {
    //Argument: the employee object in question, a date stamp "YYYY-MM-DD HHMM"
    //returns Employee Record (object)
    //Add an object with keys to the timeInEvents Array on record Object: [type (TimeIn), hour, date]

    let date = dateStamp.split(" ")
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(date[1]),
        date: date[0]
    }

    let newObj = Object.assign({}, object)
    newObj.timeOutEvents[newObj.timeOutEvents.length] = timeOut
    return newObj

    //Mutates original object by adding the new information
    // object.timeOutEvents[object.timeOutEvents.length] = timeOut
    // return object
}

function hoursWorkedOnDate(object, dateForm) {
    //Takes in employee record object and date
    //Calculates pay owed using hourly pay
    //Return as a number

    //Use a filter function to get the exact date but get the arrays first
    //To get to the information for timeIn and timeOut, we need to dig into the object
    //To extract the amount of hours worked, we need to subtract timeOut by timeIn
    //We also need to convert time so that we subtract by hours
    //in 24 hour time, should separate time into hours and min, haven't figured out yet but works for straight hours

    //Makes new arrays with just the time in and time out objects

    let newArrIn = Object.values(object.timeInEvents)
    let newArrOut = Object.values(object.timeOutEvents)

    //Filters out by the date

    function filterByTime(e) {
        return e.date === dateForm
    }

    newArrIn = newArrIn.filter(filterByTime)
    newArrOut = newArrOut.filter(filterByTime)

    //Calculates hours worked; so far doesn't work correctly when including minutes

    let hours = (newArrOut[0].hour - newArrIn[0].hour) / 100
    console.log(hours)
    return hours

}

function wagesEarnedOnDate(object, dateForm) {
    //Use hoursWorkedOnDate function to calculate wages earned on date
    let payRate = object.payPerHour
    let hours = hoursWorkedOnDate(object, dateForm)
    let wage = payRate * hours

    console.log(wage)

    return wage
}

function allWagesFor(object) {
    //takes in employee object, calculates total wages
    //Reduce function that uses hoursworkedondate to calculate total amount of hours?

    //Define arrays for in and out time stamps

    let newArrIn = makeNewArrayHours(object.timeInEvents)
    let newArrOut = makeNewArrayHours(object.timeOutEvents)

    //use the function below to extract an array of only the time

    function makeNewArrayHours(x) {
        let newArr = []
        for (let i = 0; i < x.length; i++) {
            let temp = (Object.values(x[i]))
            newArr.push(temp[1])
        }
        return newArr
    }

    //subtract the two arrays from each other using a map + arrow function, then divide by 100

    let totalHrArr = newArrOut.map((n, i) => (n - newArrIn[i]) / 100)

    //use a simple reducer to add all the hours together

    const reducer = (accu, init) => accu + init;
    let totalHrs = totalHrArr.reduce(reducer, 0)

    console.log(`Total pay for employee, ${object.firstName} ${object.familyName} is $${totalHrs * object.payPerHour}`)

    return totalHrs * object.payPerHour

    //Next time I need to use previous function but this works just as well (probably would work the same way)
}

function calculatePayroll(array) {
    //Calculates total payroll that company has to give
    //Argument is an array of employee records

    //Have a variable that makes an array of employees

    console.log(array[0])
    console.log(array[1])

    console.log(" ")

    //have a function for running AllWagesFor for every employee, throws it into an array

    let totalPayArr = array.map(i => allWagesFor(i))

    //Function that mutates new array into a final total in $ amount using reduce

    const reducer = (accu, init) => accu + init;
    let payrollFinal = totalPayArr.reduce(reducer, 0)

    console.log(`Final payroll cost is: $${payrollFinal}`)

    return payrollFinal
}
