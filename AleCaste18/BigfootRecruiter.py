def feet_checker (size):
 if size < 50: 
   print('Mi dispiace, se hai i piedi più piccoli di AleCaste18 non puoi accedere alla selezione')
 else:
   print ('Non mentire, non puoi avere i piedi più grandi di AleCaste18')

name = input('Come ti chiami? ');
size = int(input(f'Benvenuto {name}, per partecipare alla selezione inserisci il numero della tua taglia di scarpe '));

print(feet_checker(size))




