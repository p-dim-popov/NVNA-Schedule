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
        let url = `https://api.allorigins.win/get?url=${encodeURIComponent(nvnaUrl)}&callback=?`;

        // fetch(url) //use this after allow cors on web--scrapper
        //     //.then(r => r.ok ? r : throw(r.status))
        //     .then(r => r.json())
        //     .then(requestHandler);
        $.getJSON(url, requestHandler);

        function requestHandler(data){
            console.log(data);
            scheduleTable.innerHTML = data.contents.match(/<table>[.\s\S]*?<\/table>/uimg)[0];
            scheduleTable.firstElementChild.firstElementChild.nextElementSibling.remove(); //remove previous and next buttons
            let table = scheduleTable.firstElementChild;
            getWeekDaysArray(table)
                .forEach(day => {
                    day.style.color = 'blue';
                    day.style.fontWeight = 'bold';
                    if (hasAssignments(day))
                    {
                        console.log(getClassesArray(day))
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
})();
