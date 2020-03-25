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