const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.date'),
    daysContainer = document.querySelector('.days'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    todayBtn = document.querySelector('.today-btn'),
    gotoBtn = document.querySelector('.goto-btn'),
    dateInput = document.querySelector('.date-input'),
    eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector('.event-date'),
    eventsContainer = document.querySelector('.events'),
    addEventBtn = document.querySelector('.add-event'),
    addEventWrapper = document.querySelector('.add-event-wrapper '),
    addEventCloseBtn = document.querySelector('.close '),
    addEventTitle = document.querySelector('.event-name '),
    addEventFrom = document.querySelector('.event-time-from '),
    addEventTo = document.querySelector('.event-time-to '),
    addEventPrice = document.querySelector('.event-price'),
    addEventComment = document.querySelector('.event-comment'),
    addEventSubmit = document.querySelector('.add-event-btn ')

var contextMenu = document.getElementById('contextMenu')
var deleteButton = document.getElementById('deleteButton')
var editButton = document.getElementById('editButton')
var activateButton = document.getElementById('activateButton')

let today = new Date()
let activeDay
let month = today.getMonth()
let year = today.getFullYear()

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

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

const eventsArr = []
getEvents()
console.log(eventsArr)

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const prevLastDay = new Date(year, month, 0)
    const prevDays = prevLastDay.getDate()
    const lastDate = lastDay.getDate()
    const day = firstDay.getDay()
    const nextDays = 7 - lastDay.getDay() - 1

    date.innerHTML = months[month] + ' ' + year

    let days = ''

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`
    }

    for (let i = 1; i <= lastDate; i++) {
        //check if event is present on that day
        let event = false
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                event = true
            }
        })
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            activeDay = i
            getActiveDay(i)
            updateEvents(i)
            if (event) {
                days += `<div class="day today active event">${i}</div>`
            } else {
                days += `<div class="day today active">${i}</div>`
            }
        } else {
            if (event) {
                days += `<div class="day event">${i}</div>`
            } else {
                days += `<div class="day ">${i}</div>`
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`
    }
    daysContainer.innerHTML = days

    addListner()
}

//function to add month and year on prev and next button
function prevMonth() {
    month--
    if (month < 0) {
        month = 11
        year--
    }
    initCalendar()
}

function nextMonth() {
    month++
    if (month > 11) {
        month = 0
        year++
    }
    initCalendar()
}

prev.addEventListener('click', prevMonth)
next.addEventListener('click', nextMonth)

initCalendar()

//function to add active on day
function addListner() {
    const days = document.querySelectorAll('.day')
    days.forEach((day) => {
        day.addEventListener('click', (e) => {
            getActiveDay(e.target.innerHTML)
            updateEvents(Number(e.target.innerHTML))
            activeDay = Number(e.target.innerHTML)
            //remove active
            days.forEach((day) => {
                day.classList.remove('active')
            })
            //if clicked prev-date or next-date switch to that month
            if (e.target.classList.contains('prev-date')) {
                prevMonth()
                //add active to clicked day afte month is change
                setTimeout(() => {
                    //add active where no prev-date or next-date
                    const days = document.querySelectorAll('.day')
                    days.forEach((day) => {
                        if (
                            !day.classList.contains('prev-date') &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add('active')
                        }
                    })
                }, 100)
            } else if (e.target.classList.contains('next-date')) {
                nextMonth()
                //add active to clicked day afte month is changed
                setTimeout(() => {
                    const days = document.querySelectorAll('.day')
                    days.forEach((day) => {
                        if (
                            !day.classList.contains('next-date') &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add('active')
                        }
                    })
                }, 100)
            } else {
                e.target.classList.add('active')
            }
        })
    })
}

todayBtn.addEventListener('click', () => {
    today = new Date()
    month = today.getMonth()
    year = today.getFullYear()
    initCalendar()
})

dateInput.addEventListener('input', (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, '')
    if (dateInput.value.length === 2) {
        dateInput.value += '/'
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7)
    }
    if (e.inputType === 'deleteContentBackward') {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2)
        }
    }
})

gotoBtn.addEventListener('click', gotoDate)

function gotoDate() {
    console.log('here')
    const dateArr = dateInput.value.split('/')
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1
            year = dateArr[1]
            initCalendar()
            return
        }
    }
    alert('Invalid Date')
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
    const day = new Date(year, month, date)
    let dayName = day.toString().split(' ')[0]
    switch (dayName) {
        case 'Mon':
            dayName = 'понедельник'
            break
        case 'Tue':
            dayName = 'вторник'
            break
        case 'Wed':
            dayName = 'среда'
            break
        case 'Thu':
            dayName = 'Четверг'
            break
        case 'Fri':
            dayName = 'пятница'
            break
        case 'Sat':
            dayName = 'суббота'
            break
        case 'Sun':
            dayName = 'воскресенье'
            break
        default:
            dayName = '' // Если значение дня не соответствует ни одному из указанных выше
    }
    eventDay.innerHTML = dayName
    eventDate.innerHTML = date + ' ' + months[month] + ' ' + year
}

//function update events when a day is active
function updateEvents(date) {
    let events = ''
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            event.events.sort((a, b) => {
                const timeA = a.time.split(' - ')[0]
                const timeB = b.time.split(' - ')[0]
                return (
                    new Date('1970/01/01 ' + timeA) -
                    new Date('1970/01/01 ' + timeB)
                )
            })

            event.events.forEach((event) => {
                if (event.confirmed === 'confirmed') {
                    events += `<div class="event active">
                <div class="title">
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.price} BYN</span>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.comment}</span>
                </div>
                
            </div>`
                } else {
                    events += `<div class="event">
                <div class="title">
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.price} BYN</span>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.comment}</span>
                </div>
                
            </div>`
                }
            })
        }
    })

    if (events === '') {
        events = `<div class="no-event">
            <h3>Нет записей</h3>
        </div>`
    }

    eventsContainer.innerHTML = events
    saveEvents()
}

//function to add event
addEventBtn.addEventListener('click', () => {
    addEventWrapper.classList.toggle('active')
})

addEventCloseBtn.addEventListener('click', () => {
    addEventWrapper.classList.remove('active')
})

document.addEventListener('click', (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
        addEventWrapper.classList.remove('active')
    }
})

//allow 50 chars in eventtitle
addEventTitle.addEventListener('input', (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60)
})

//allow only time in eventtime from and to
addEventFrom.addEventListener('input', (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '')
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ':'
    }
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5)
    }
})

addEventTo.addEventListener('input', (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '')
    if (addEventTo.value.length === 2) {
        addEventTo.value += ':'
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5)
    }
})

//function to add event to eventsArr
addEventSubmit.addEventListener('click', () => {
    const eventTitle = addEventTitle.value
    const eventTimeFrom = addEventFrom.value
    const eventTimeTo = addEventTo.value
    const eventPrice = addEventPrice.value
    const eventComment = addEventComment.value
    const eventConfirmed = 'aboba'
    if (eventTitle === '' || eventTimeFrom === '' || eventTimeTo === '') {
        alert('Please fill all the fields')
        return
    }

    //check correct time format 24 hour
    const timeFromArr = eventTimeFrom.split(':')
    const timeToArr = eventTimeTo.split(':')
    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ) {
        alert('Invalid Time Format')
        return
    }

    const timeFrom = eventTimeFrom
    const timeTo = eventTimeTo

    //check if event is already added
    let eventExist = false
    eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        ) {
            event.events.forEach((event) => {
                if (event.title === eventTitle) {
                    eventExist = true
                }
            })
        }
    })
    if (eventExist) {
        alert('Event already added')
        return
    }
    const newEvent = {
        title: eventTitle,
        time: timeFrom + ' - ' + timeTo,
        price: eventPrice,
        comment: eventComment,
        confirmed: eventConfirmed,
    }
    console.log(newEvent)
    console.log(activeDay)
    let eventAdded = false
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent)
                eventAdded = true
            }
        })
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        })
    }

    console.log(eventsArr)
    addEventWrapper.classList.remove('active')
    addEventTitle.value = ''
    addEventFrom.value = ''
    addEventTo.value = ''
    addEventPrice.value = ''
    addEventComment.value = ''
    updateEvents(activeDay)
    //select active day and add event class if not added
    const activeDayEl = document.querySelector('.day.active')
    if (!activeDayEl.classList.contains('event')) {
        activeDayEl.classList.add('event')
    }
})

// //function to delete event when clicked on event
// eventsContainer.addEventListener('contextmenu', (e) => {
//     e.preventDefault()
//     if (e.target.classList.contains('event')) {
//         if (confirm('Are you sure you want to delete this event?')) {
//             const eventTitle = e.target.children[0].children[0].innerHTML
//             eventsArr.forEach((event) => {
//                 if (
//                     event.day === activeDay &&
//                     event.month === month + 1 &&
//                     event.year === year
//                 ) {
//                     event.events.forEach((item, index) => {
//                         if (item.title === eventTitle) {
//                             event.events.splice(index, 1)
//                         }
//                     })
//                     //if no events left in a day then remove that day from eventsArr
//                     if (event.events.length === 0) {
//                         eventsArr.splice(eventsArr.indexOf(event), 1)
//                         //remove event class from day
//                         const activeDayEl =
//                             document.querySelector('.day.active')
//                         if (activeDayEl.classList.contains('event')) {
//                             activeDayEl.classList.remove('event')
//                         }
//                     }
//                 }
//             })
//             updateEvents(activeDay)
//         }
//     }
// })

//function to save events in local storage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(eventsArr))
}

//function to get events from local storage
function getEvents() {
    //check if events are already saved in local storage then return event else nothing
    if (localStorage.getItem('events') === null) {
        return
    }
    eventsArr.push(...JSON.parse(localStorage.getItem('events')))
}

// function convertTime(time) {
//   //convert time to 24 hour format
//   let timeArr = time.split(":");
//   let timeHour = timeArr[0];
//   let timeMin = timeArr[1];
//   let timeFormat = timeHour >= 12 ? "PM" : "AM";
//   timeHour = timeHour % 12 || 12;
//   time = timeHour + ":" + timeMin + " " + timeFormat;
//   return time;
// }

function updateTotal() {
    const currentDate = new Date() // Текущая дата
    const currentMonth = currentDate.getMonth() // Текущий месяц
    const currentYear = currentDate.getFullYear() // Текущий год

    let totalEarnings = 0

    for (const event of eventsArr) {
        const eventDate = new Date(event.year, event.month - 1, event.day)
        const eventMonth = eventDate.getMonth()
        const eventYear = eventDate.getFullYear()

        if (eventMonth === currentMonth && eventYear === currentYear) {
            for (const eventItem of event.events) {
                const eventPrice = parseFloat(eventItem.price)
                totalEarnings += eventPrice
            }
        }
    }

    const totalDiv = `
  <div class='total'>
  <p>Общий заработок ${totalEarnings}</p>
  </div>
  `

    // Container.innerHTML += totalDiv
}

updateTotal()

// Функция для отправки комбинированного уведомления через Web Push
function sendCombinedWebPushNotification(events) {
    // Проверяем, поддерживает ли браузер Web Push уведомления
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('Web Push уведомления не поддерживаются в данном браузере.')
        return
    }

    // Проверяем, есть ли разрешение на отправку уведомлений
    Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
            console.log('Разрешение на отправку уведомлений не получено.')
            return
        }

        // Регистрируем сервис-воркер для обработки уведомлений
        navigator.serviceWorker
            .register('sw.js')
            .then((registration) => {
                // Отправляем комбинированное уведомление
                registration.showNotification('Новые события', {
                    body: buildCombinedNotificationBody(events),
                    icon: 'ios/1024.png',
                    // ... дополнительные настройки уведомления
                })
            })
            .catch((error) => {
                console.log('Ошибка при регистрации сервис-воркера:', error)
            })
    })
}

// Функция для построения текста комбинированного уведомления
function buildCombinedNotificationBody(events) {
    let notificationBody = ''

    events.forEach((event) => {
        notificationBody += `Клиент "${event.title}" завтра\n`
        // ... добавьте дополнительные данные события, если нужно
    })

    return notificationBody
}

// Функция для проверки событий и отправки уведомлений за день до наступления
function checkEventsForNotification(eventsArr) {
    const currentDate = new Date() // Текущая дата
    const eventsToSend = [] // Массив для хранения событий, подходящих для отправки

    for (const eventObj of eventsArr) {
        const eventDate = new Date(
            eventObj.year,
            eventObj.month - 1,
            eventObj.day
        )

        for (const event of eventObj.events) {
            // Вычисляем разницу во времени между текущей датой и датой события
            const timeDiff = eventDate.getTime() - currentDate.getTime()
            const oneDay = 24 * 60 * 60 * 1000 // Количество миллисекунд в одном дне

            // Если разница во времени составляет примерно один день, добавляем событие в массив
            if (timeDiff > 0 && timeDiff <= oneDay) {
                eventsToSend.push(event)
            }
        }
    }

    // Если есть события для отправки, вызываем функцию для комбинированного уведомления
    if (eventsToSend.length > 0) {
        sendCombinedWebPushNotification(eventsToSend)
    }
}

// Вызываем функцию проверки событий и отправки уведомлений
checkEventsForNotification(eventsArr)

let eventTitle

// Функция для отображения контекстного меню
function showContextMenu(event) {
  if (event.target.classList.contains('event')) {
    eventTitle = event.target.children[0].children[0].innerHTML;
    console.log(event.target);
    console.log(eventTitle);

    const eventToUpdate = eventsArr.find((event) => {
      return (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      );
    });

    if (eventToUpdate) {
      const itemToUpdate = eventToUpdate.events.find((item) => {
        return item.title === eventTitle;
      });

      if (itemToUpdate) {
        if (itemToUpdate.confirmed === 'confirmed') {
          activateButton.textContent = 'Деактивировать';
        } else {
          activateButton.textContent = 'Активировать';
        }
        console.log('Updated:', itemToUpdate);
      }
    }

    contextMenu.style.display = 'block';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';

    event.preventDefault();
    event.stopPropagation();
  } else {
    hideContextMenu();
  }
}

// Функция для скрытия контекстного меню
function hideContextMenu() {
  contextMenu.style.display = 'none';
}

// Обработчик события для вызова контекстного меню
eventsContainer.addEventListener('click', showContextMenu);

// Обработчик события для скрытия контекстного меню при клике вне него
document.addEventListener('click', hideContextMenu);


// Обработчики событий для кнопок контекстного меню
deleteButton.addEventListener('click', function () {
    // Действия при нажатии на кнопку "Удалить"
    console.log(eventTitle)
    eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        ) {
            event.events.forEach((item, index) => {
                if (item.title === eventTitle) {
                    event.events.splice(index, 1)
                }
            })
            //if no events left in a day then remove that day from eventsArr
            if (event.events.length === 0) {
                eventsArr.splice(eventsArr.indexOf(event), 1)
                //remove event class from day
                const activeDayEl = document.querySelector('.day.active')
                if (activeDayEl.classList.contains('event')) {
                    activeDayEl.classList.remove('event')
                }
            }
        }
    })
    updateEvents(activeDay)
    alert("Вы выбрали опцию 'Удалить'")
})

editButton.addEventListener('click', function () {
    // Действия при нажатии на кнопку "Редактировать"
    alert("Вы выбрали опцию 'Редактировать'")
})



activateButton.addEventListener('click', function () {
    const eventToUpdate = eventsArr.find((event) => {
        return (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
        )
    })

    if (eventToUpdate) {
        const itemToUpdate = eventToUpdate.events.find((item) => {
            return item.title === eventTitle
        })

        if (itemToUpdate) {
            if (itemToUpdate.confirmed === 'aboba') {
                itemToUpdate.confirmed = 'confirmed'
                console.log('Updated:', itemToUpdate)
            } else if (itemToUpdate.confirmed === 'confirmed') {
                itemToUpdate.confirmed = 'aboba'
                console.log('Updated:', itemToUpdate)
            }
        }
    }

    

    updateEvents(activeDay)
    alert("Вы выбрали опцию 'Активировать'")
})




