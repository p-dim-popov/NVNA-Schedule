(function main() {
    const submitBtn = document.getElementById('submitBtn');
    const [code, week, group, lecturer, room] = document.getElementsByTagName('input');
    const scheduleTable = document.getElementsByTagName('table')[0];

    submitBtn.addEventListener('click', submitHandler);

    async function submitHandler(e)
    {
        e.preventDefault();
        if (!(group.checked || lecturer.checked || room.checked))
        {
            alert("Избери за к'во търсиш, ве!");
            return;
        }
        if (!week.value)
        {
            alert('Неправилно избрана дата!');
            return;
        }

        let searchingFor;

        if (group.checked) searchingFor = 'group';
        else if (lecturer.checked) searchingFor = 'lecturer';
        else if (room.checked) searchingFor = 'room';

        let weekValue = week.value.match(/-W?(\d+)/)[1];

        let nvnaUrl = `http://nvna.eu/schedule/?group=${code.value}&queryType=${searchingFor}&Week=${weekValue}`;
        let url = `https://web--scrapper.herokuapp.com/webscrapper?url=${encodeURIComponent(nvnaUrl)}`;
        // url = '../testNoFormat.html'; //for working locally
        fetch(url)
            // .then(r => r.text()) //for working locally
            // .then(r => ({contents: r})) //for working locally
            .then(r => r.json()) //for deployment
            .then(requestHandler);

        function requestHandler(data)
        {
            scheduleTable.innerHTML = data.contents.match(/<table>[.\s\S]*?<\/table>/uimg)[0];
            let table = scheduleTable.firstElementChild;
            let weekDays = getWeekDaysArray(table);
            let classes;
            weekDays
                .forEach((day, i, arr) => {
                    day.firstElementChild.classList.add('weekDayTag');
                    if (hasAssignments(day))
                    {
                        classes = getClassesArray(day);
                        classes
                            .forEach(_class => {
                                if (hasClass(_class))
                                {
                                    if (isTheClassDoubled(_class))
                                    {
                                        //do sth
                                    }
                                }
                            })
                    }
                    else
                    {
                        day.classList.add('noLectures')
                    }
                })
        }
    }

    function getDayFromTable(day, table)
    {
        return Array.from(table.children)
            .filter(tr => {
                let td = tr.firstElementChild;
                if (td)
                    if (td.textContent.match(day))
                        return true;
                return false
            })[0]
    }

    function getWeekDaysArray(table)
    {
        return [
            getDayFromTable('Понеделник', table),
            getDayFromTable('Вторник', table),
            getDayFromTable('Сряда', table),
            getDayFromTable('Четвъртък', table),
            getDayFromTable('Петък', table),
            getDayFromTable('Събота', table),
            getDayFromTable('Неделя', table)
        ]
    }

    function hasAssignments(day)
    {
        return day.nextElementSibling.firstElementChild.textContent !== 'Няма занятия'
    }

    function getClassesArray(day)
    {
        let tempClass;
        return [
            tempClass = day.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass = tempClass.nextElementSibling,
            tempClass.nextElementSibling
        ]
    }

    function isTheClassDoubled(theClass)
    {
        const checkVariable = theClass.firstElementChild.nextElementSibling;
        if (checkVariable.hasAttribute('rowspan'))
            return checkVariable.getAttribute('rowspan') === "2";
        return false;
    }

    function hasClass(theClass)
    {
        const checkVariable = theClass.firstElementChild.nextElementSibling;
        if (checkVariable)
            if (checkVariable.hasAttribute('rowspan'))
                return checkVariable.getAttribute('rowspan') === "2" ||
                    checkVariable.getAttribute('rowspan') === "1";
        return false;
    }
})();
