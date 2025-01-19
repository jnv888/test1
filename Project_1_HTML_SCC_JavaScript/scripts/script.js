//*************************  Календарь 

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
]

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function getById(id) {
    return document.getElementById(id)
}

function getCalendar(id) {
    return document.getElementById(id)
}

let date = new Date()
let curMonth = date.getMonth()
let curYear = date.getFullYear()
const calendarDays = getById('days')

let counter = 0
let allDays = []
let clickedDays = []
let beetweenDays = []
let monthId = 'month'
let daysId = 'days'
let dayTitleId = 'daysTitle'
let nextId = 'next'
let prevId = 'prev'
let hideId = 'hide'
let calendarId = 'calendar'
let okId = 'ok'
let cancelId = 'cancel'
let showCalendar = true

function showCurrMonth() {
    showMonth()
}

function showMonth() {
    getById(monthId).textContent = `${months[curMonth]} ${curYear} `
    let firstDayOfMonth = new Date(curYear, curMonth, 7).getDay()
    let lastDayOfMonth = new Date(curYear, curMonth + 1, 0).getDate()
    let lastDayOfPrevMonth = new Date(curYear, curMonth, 0).getDate()

    for (let i = 1; i <= lastDayOfMonth; i += 1) {
        // добавление предыдущих дней месяца
        if (i === 1) {
            let prevMontsDay = lastDayOfPrevMonth - firstDayOfMonth + 1
            for (let j = 0; j < firstDayOfMonth; j += 1) {
                let day = document.createElement('div')
                day.textContent = prevMontsDay
                day.classList.add('day-title', 'inactive')
                calendarDays.append(day)
                prevMontsDay += 1
            }
        }
        // актуальные дни
        let day = document.createElement('div')
        day.textContent = i
        day.classList.add('day-title')
        day.addEventListener('click', () => {
            paintDay(day)
        })
        allDays.push(day)
        calendarDays.append(day)
        // добавление дней следующего месяца
        if (i === lastDayOfMonth) {
            let remainDays = new Date(curYear, curMonth, i).getDay()
            let counterVar = 1
            for (remainDays; remainDays < 7; remainDays += 1) {
                let day = document.createElement('div')
                day.textContent = counterVar
                day.classList.add('day-title', 'inactive')
                calendarDays.append(day)
                counterVar += 1
            }
        }
    }
}

function paintDay(day) {
    if (counter > 1) {
        counter = 0
        clickedDays.forEach(item => item.style.backgroundColor = 'inherit')
        clickedDays = []
        beetweenDays.forEach(item => item.style.backgroundColor = 'inherit')
        beetweenDays = []
    }
    if (clickedDays.length && +day.textContent < +clickedDays[0].textContent) {
        return
    }
    clickedDays.push(day)
    if (counter === 1) {
        let first = allDays.indexOf(clickedDays[0])
        let last = allDays.indexOf(clickedDays[1])
        beetweenDays = allDays.slice(first + 1, last)
        beetweenDays.forEach(item => item.style.backgroundColor = 'rgb(173, 160, 206)')
    }
    day.style.backgroundColor = 'rgb(91, 77, 127)'
    counter += 1
}

function createCalendar() {
    getById(nextId).addEventListener('click', nextMonth)
    getById(prevId).addEventListener('click', prevMonth)
    let title = getById(dayTitleId)
    daysOfWeek.forEach(item => {
        let day = document.createElement('div')
        day.textContent = item
        day.classList.add('day-title')
        title.append(day)
    })
    showCurrMonth()
}

function nextMonth() {
    if (curMonth === 11) {
        curMonth = 0
        curYear += 1
    } else {
        curMonth += 1
    }
    clearBlock()
    showCurrMonth()
}

function prevMonth() {
    if (curMonth === 0) {
        curMonth = 11
        curYear -= 1
    } else {
        curMonth -= 1
    }
    clearBlock()
    showCurrMonth()
}

function clearBlock() {
    getById(daysId).innerHTML = ''
    getById(dayTitleId).innerHTML = ''
}


getById(hideId).addEventListener('click', () => {
    const calendar = getCalendar(calendarId)
    clearBlock()
    counter = 0
    allDays = []
    clickedDays = []
    beetweenDays = []

    if (showCalendar) {
        createCalendar()
        calendar.style.display = 'block'
    } else {
        calendar.style.display = 'none'
    }
    showCalendar = !showCalendar
})

getById(cancelId).addEventListener('click', () => {
    const calendar = getCalendar(calendarId)
    calendar.style.display = 'none'
    showCalendar = !showCalendar
})

getById(okId).addEventListener('click', () => {
    const contButton = getById(hideId)
    currentMonth = curMonth === 0 ? '01' : curMonth < 9 ? '0' + String(curMonth + 1) : curMonth + 1
    if (clickedDays.length <= 1) {
        contButton.textContent = clickedDays[0].textContent + '.' + currentMonth + '.' + curYear
    }
    else {
        contButton.textContent = clickedDays[0].textContent + '.' + currentMonth + '.' + curYear +
            ' - ' + clickedDays[clickedDays.length - 1].textContent + '.' + currentMonth + '.' + curYear
    }

    const calendar = getCalendar(calendarId)
    calendar.style.display = 'none'
    showCalendar = !showCalendar
})

// ********************* Поле Откуда ******************************************

const cityFromArr = ['Москва', 'Санкт-Петербург', 'Калиниград', 'Пермь', 'Казань', 'Нижний Новгород',
    'Курск', 'Казань', 'Екатеринбург', 'Ростов-на-Дону', 'Краснодар', 'Воронеж', 'Сочи', 'Псков',
    'Самара', 'Великий Новгород', 'Орел', 'Рязань', 'Мурманск', 'Петрозаводск', 'Тула', 'Тверь',
]

const input = document.getElementById('from');
const fromBlock = getById('fromBlock')
let cityTeg = getById('city')

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

input.addEventListener('input', debounce(() => {
    fromBlock.style.display = 'block'

    for (let city of cityFromArr) {
        if (city.toLowerCase().includes(input.value.toLowerCase())) {
            let block = document.createElement('div')
            block.textContent = city
            cityTeg.append(block)
            block.addEventListener('click', () => {
                fullInputField.bind(city)
                fullInputField(city)
            })
        }
    }
}, 1000));

function fullInputField(cityVar) {
    const mainTeg = document.getElementById('from');
    mainTeg.value = cityVar
    fromBlock.style.display = 'none'
    getById('city').innerHTML = ''
}

//**************************** Пассажиры ***********************************

const btn = document.querySelector("#passBtn");
const menu = document.querySelector("#pass");
const selected = document.querySelector("#selected");
const passOk = document.querySelector("#passOk");
let passClass = ''

let show = false;
btn.addEventListener("click", () => {
    if (show) {
        menu.style.display = "none";
        const allPassengers = Object.values(passengers).reduce((acc, item) => acc + item)
        if (allPassengers) {
            selected.textContent = `${allPassengers} пассажиров`
        }

    } else {
        menu.style.display = "block";
    }
    show = !show;
});

menu.addEventListener("click", (e) => {
    e.stopPropagation();
});

const minusBtns = document.querySelectorAll(".minus");
const plusBtns = document.querySelectorAll(".plus");
const counters = document.querySelectorAll(".counter");
const chips = document.querySelectorAll(".chips_item");

const passengers = {
    adult: 0,
    children: 0,
    baby: 0,
};
plusBtns.forEach((btn) => {
    changeCounter(btn, 'plus')
});
minusBtns.forEach((btn) => {
    changeCounter(btn, 'minus')
});

function changeCounter(btn, sign) {
    let plus = true
    if (sign === 'minus') {
        plus = false
    }
    btn.addEventListener("click", () => {
        const id = +btn.dataset.id;
        switch (id) {
            case 0:
                if (!checkPassengers('adult', plus)) return
                plus ? passengers.adult++ : passengers.adult--;
                counters[id].textContent = passengers.adult;
                break;
            case 1:
                if (!checkPassengers('children', plus)) return
                plus ? passengers.children++ : passengers.children--;
                counters[id].textContent = passengers.children;
                break;
            case 2:
                if (!checkPassengers('baby', plus)) return
                plus ? passengers.baby++ : passengers.baby--;
                counters[id].textContent = passengers.baby;
                break;
            default:
                break;
        }
    });
}

function checkPassengers(key, plus) {
    if (passengers[key] === 0 && !plus) {
        return false
    }
    const allPassengers = Object.values(passengers).reduce((acc, item) => acc + item)
    if (allPassengers >= 9 && plus) {
        return alert('Не более 9 пассажиров')
    }
    return true
}

chips.forEach((btn) => {
    checkClass(btn)
});

function checkClass(btn) {
    btn.addEventListener("click", () => {
        btn.style.backgroundColor = '#ff4d4d';
        btn.style.color = 'white';
        passClass = btn.textContent;
    })
}

passOk.addEventListener("click", () => {
    const allPassengers = Object.values(passengers).reduce((acc, item) => acc + item)
    let result = document.querySelector("#passBtn");
    result.textContent = allPassengers + ' пассажиров, ' + passClass;
    menu.style.display = "none";
    show = !show;
});

// ************************** По кнопке Найти выводим данные в консоль *************

const search = document.querySelector("#search");
const fromVar = document.getElementById('from');
const to = document.getElementById('to');
const dates = document.getElementById('hide');
const howPass = document.getElementById('passBtn')

search.addEventListener("click", () => {
    console.log('Город вылета: ' + fromVar.value + ', ' + ' Город назначения: ' + to.value + ', ' + ' Даты вылета - прилета: ' + dates.textContent +
        ', ' + ' Пассажиры, класс: ' + howPass.textContent
    )
})


