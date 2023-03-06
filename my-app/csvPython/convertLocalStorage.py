import csv

localStorage = {}
f = open('userTimes.csv', 'w')
header = ['username', 'time(ms)']

writer = csv.writer(f)
writer.writerow(header)

for user, values in localStorage.items():
    row = [user, values[1]]
    writer.writerow(row)