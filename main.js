const csvString = 'ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26'
const testString = 'Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232'

//////////////////////// PART 2 //////////////////////// 
// Instead of hard-coding four columns per row, expand your code to accept any number of columns. 
// This should be calculated dynamically based on the first row of data
function parseCSV(csvString) {

    // split row on newline
    const csvRows = csvString.split('\n')

    // declare a variable that stores the number of columns in each row of data within the CSV.
    const rowLength = csvRows.length

    // split row data on comma, store in two dimensional array
    const splitColumns = csvRows.map(row => row.split(','))

    // convert keys to lowercase
    const header = splitColumns[0].map(key => key.toLowerCase())

    // slice data from header row
    const data = splitColumns.slice(1, rowLength)

    return { header, data }
}

//////////////////////// PART 3 //////////////////////// 
function convertToArrayOfObjects(header, data) {
    // For each row of data in the result array produced by your code 
    // above, create an object where the key of each value is the heading
    // for that value’s column
    let objArray = []
    for (const row of data) {
        let obj = {}
        let i = 0
        for (const entry of row) {
            obj[header[i]] = entry
            i++
        }
        objArray.push(obj)
    }
    //store in multi dimensional array
    return objArray
}


//////////////////////// PART 4 //////////////////////// 
const { header, data } = parseCSV(csvString)
const arrayOfObjects = convertToArrayOfObjects(header, data)
const sortedArray = arrayOfObjects.sort((a, b) => parseInt(a.id) - parseInt(b.id))


// remove the last element from the sorted array.
sortedArray.pop()

// insert the following object at index 1
sortedArray.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" })

// add the following object to the end of the array
sortedArray.push( { id: "7", name: "Bilbo", occupation: "None", age: "111" })

console.log(sortedArray)


// Finally, use the values of each object within the array and the array’s length property to calculate the average age of the group. 
// This calculation should be accomplished using a loop.
let sum = 0
let arrayLength = sortedArray.length
for(let i =0; i < arrayLength; i++){
   const age = parseInt(sortedArray[i].age) 
   sum+=age
}
console.log(`The average age is ${sum/arrayLength}\n`)



//////////////////////// PART 5 //////////////////////// 
function convertToCSV(objArray){
    // get and join header values
    const header = Object.keys(objArray[0]).join(',')
    
    // get and join row values
    let newArray = [header]
    for(const row of objArray){
        const values = Object.values(row).join(',')
        newArray.push(values)
    }
    // join the final array with a newline
    return newArray.join('\n')
}

// convert array back to csv
const stringCSV = convertToCSV(sortedArray)
console.log(stringCSV)
//test stringCSV
const { header:header2, data:data2 } = parseCSV(stringCSV)
const arrayOfObjects2 = convertToArrayOfObjects(header2, data2)
const sortedArray2 = arrayOfObjects2.sort((a, b) => parseInt(a.id) - parseInt(b.id))
console.log(sortedArray2)