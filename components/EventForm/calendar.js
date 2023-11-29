let pickDay = new Date()
let currDate = new Date()
let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}
let curr_day = {value: currDate.getDay()} 
let calendar = document.querySelector('.calendar')
let month_list = calendar.querySelector('.monthList')
let month_picker = calendar.querySelector('#monthPicker')
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {
    let calendar_days = calendar.querySelector('.calendarDays')
    let calendar_header_year = calendar.querySelector('#year')
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    month = month ?? currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendarDayHover')
            day.innerHTML = i - first_day.getDay() + 1
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('currDate')
            }
        }
        day.addEventListener("click", (event) => {
            if(event.target.textContent != ""){
                console.log(month)
                pickDay = new Date(year, Number(month), parseInt(event.target.textContent))
                calendar.querySelectorAll(".active").forEach(target => {
                    target.classList.remove("active")
                })
                event.target.classList.add("active")
                change("img2")
            }
            
        })
        calendar_days.appendChild(day)
    }
}

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div dataMonth="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

month_picker.onclick = () => {
    month_list.classList.add('show')
}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prevYear').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#nextYear').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
