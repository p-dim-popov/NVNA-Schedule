(function main() {
    const submitBtn = document.getElementById('submitBtn');
    const [code, week, group, lecturer, room] = document.getElementsByTagName('input');
    const scheduleTable = document.getElementsByTagName('table')[0];
    flatpickr(week, {});

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

        submitBtn.disabled = true;
        submitBtn.textContent = 'Зарежда се';

        let searchingFor;

        if (group.checked) searchingFor = 'group';
        else if (lecturer.checked) searchingFor = 'lecturer';
        else if (room.checked) searchingFor = 'room';

        //let weekValue = week.value.match(/-W?(\d+)/)[1];
        let weekValue = new Date(week.value).getWeek();

        let nvnaUrl = `http://nvna.eu/schedule/?group=${code.value}&queryType=${searchingFor}&Week=${weekValue}`;
        let url = `https://web--scrapper.herokuapp.com/webscrapper?url=${encodeURIComponent(nvnaUrl)}`;

        // url = '../testNoFormat.html'; //for working locally
        try
        {
            let data;
            let response = await fetch(url);
            // data = {contents: await response.text()}; //for working locally
            data = await response.json(); //for deployment
            requestHandler(data);
        }
        catch (e)
        {
            console.log(e);
        }
        finally
        {
            submitBtn.removeAttribute('disabled');
            submitBtn.textContent = 'Покажи';
        }

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
})();
