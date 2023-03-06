import csv

localStorage = {
    "ytoij": 3229,
    "carpedsadfsa": 4956
}
f = open('userTimes.csv', 'w')
header = ['username', 'time(ms)']

writer = csv.writer(f)
writer.writerow(header)


for user, time in localStorage.items():
    row = [user, time]
    writer.writerow(row)