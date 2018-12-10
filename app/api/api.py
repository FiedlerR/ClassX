import webuntis
from datetime import datetime, timedelta
from webuntis.objects import PeriodObject
import json

with open("app/config/.keys") as data:
    jsonConf = json.load(data)

s = webuntis.Session(
    username=jsonConf['UntisUser'],
    password=jsonConf['UntisPass'],
    server='urania.webuntis.com',
    school='htl3r',
    useragent='WebUntis Test'
).login()

now = datetime.now()
bufferDays = now + timedelta(days=3)

# currentLessons = sorted(s.timetable(klasse=503, start=now, end=bufferDays), key=lambda x: x.start)
currentLessons = s.timetable(klasse=503, start=now, end=bufferDays).combine(combine_breaks=True)

# for x in range(0, currentLessons.__len__()):
# if currentLessons[x].subjects[0].name == currentLessons[x + 1].subjects[0].name:
#    currentLessons[x].subjects.append
# print(map(currentLessons, lambda x: x.end))
foundCounter = 0


def isInRange(element):
    global foundCounter
    if foundCounter < 2:
        if element.end > datetime.now():
            foundCounter += 1
            return element.end > datetime.now()
        return False
    return False


filteredLesson = filter(isInRange, currentLessons)

data = []
for fach in filteredLesson:
    minsLeft = (fach.end - datetime.now()).total_seconds() / 60
    difference = (fach.end - fach.start).total_seconds() / 60
    data.append({
        "subjects": [{
            "long": subject.long_name,
            "short": subject.name
        } for subject in fach.subjects],
        "start": fach.start.__str__(),
        "end": fach.end.__str__(),
        "differenceHour": difference,
        "countdown": minsLeft,
        "progressPercent": 100 - ((minsLeft * 100) / difference),
        "rooms": [room.name for room in fach.rooms],
        "teachers": [{
            "fullName": teacher.full_name,
            "shortName": teacher.name,
            "surname": teacher.surname,
            "forename": teacher.fore_name,
            "title": teacher.title
        } for teacher in fach.teachers]
    })

json_data = json.dumps(data)
print(json_data)
